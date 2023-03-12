import axios from "axios";
import Database from "./database.mjs";
import jwt from 'jsonwebtoken';
import Sessions from "./stream/sessions.mjs";

const stateToken = process.env.STATE_TOKEN;
const client = process.env.CLIENT; 
const clientSecret = process.env.CLIENT_SECRET;

const redirect = process.env.NODE_ENV === 'production' ?
    'https://notsoerudite.com/authorise' : 'http://localhost:3000/authorise'

export default class Auth {
    static SESSION_ACCESS_TOKEN = null;
    static SESSION_REFRESH_TOKEN = null;
    static SESSION_CHAT_SOCKET = null;

    static REFRESH_TOKEN_KEY = process.env.NODE_ENV === 'production' ?
        'refresh_token' : 'development_refresh_token';

    static async get(url) {
        const response = await axios.get(
            url,
            { headers: { "Authorization": "Bearer " + this.SESSION_ACCESS_TOKEN }}
        );
        return response.data;
    }

    static async initialise() {
        try {
            // Read the refresh token from database.
            this.SESSION_REFRESH_TOKEN = await this.loadRefreshToken();

            // Check if previous token exists or already valid, otherwise refresh.
            this.SESSION_ACCESS_TOKEN = await this.refresh();

            // Otherwise prompt for authorsation.
            if (!this.SESSION_ACCESS_TOKEN) {
                // Send the user to Restream OAuth2 Login page
                const url = `https://api.restream.io/login?response_type=code&client_id=${client}&redirect_uri=${encodeURIComponent(redirect)}&state=${stateToken}`;
                console.log('Login:', url);
            }

            // Set up the refresh token interval.
            setInterval(() => this.refresh(), (1000 * 60) * 50);

            return true;
            
        } catch(e) {
            console.log('Failed to initialise via Restream');
            console.error(e);
            return false;
        }
    }

    static async me(req, res) {
        let user = null;
        try {
            user = this.userFromRequest(req);
        } catch(e) {
            console.log('Error processing user JWT')
        }
        return res.json({ user });
    }

    static async authorise(req, res) {
        try {
            const { code, state } = req.query;

            console.log('Attempting to login...');

            // Implement anti-CSRF that's recommended.
            if (state !== stateToken)
                throw new Error('State token mismatch');

            // Exchange a code for a token pair.
            await this.exchange(code);
    
            console.log('Exchange completed...');
    
            // Can test here and return profile information on the profile page
            const profile = await this.profile();
            if (!profile) 
                throw new Error('Invalid profile.');

            // Don't allow token overwrite/creation if not admin. (INTEGRATION)
            if (profile.email !== process.env.ADMIN_EMAIL)
                throw new Error('State token mismatch');

            console.log('Successfully logged in...');

            // Sessions aren't initialised if not logged in, 
            // initialise on login to compensate.
            await Sessions.initialise();
    
            return res.json({ 
                me: profile,
                token: jwt.sign(
                    { email: profile.email }, 
                    process.env.CLIENT_SECRET, 
                    { expiresIn: 60 * 60 * 240 }
                )
            });

        } catch(e) {
            // console.error(e);
            return res.status(500).send('ERROR...');
        }
    }

    static async refresh() {
        let accessToken = null;
        try {
            const data = {
                grant_type: 'refresh_token',
                redirect_uri: redirect,
                refresh_token: this.SESSION_REFRESH_TOKEN  
            };
    
            const url = 'https://api.restream.io/oauth/token';
            const response = await axios.post(url,
                new URLSearchParams(data).toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    auth: {
                        username: client,
                        password: clientSecret
                    }
                }
            );

            // Update the refresh key (persisted).
            await this.persistRefreshToken(response.data.refresh_token);
            this.SESSION_REFRESH_TOKEN = response.data.refresh_token;

            // Update session access token and return it.
            accessToken = this.SESSION_ACCESS_TOKEN = response.data.access_token;

        } catch(e) {
            console.log('Error refreshing...');
        }
        return accessToken;
    }

    static async exchange(code) {
        let token = null;
        const url = 'https://api.restream.io/oauth/token';
        
        try {
            const data = {
                grant_type: 'authorization_code',
                redirect_uri: redirect,
                code,
                client_id: client,
                client_secret: clientSecret        
            };

            const response = await axios.post(url,
                new URLSearchParams(data).toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    auth: {
                        username: client,
                        password: clientSecret
                    }
                }
            );
    
            // Set the token from the data.
            token = response.data;

            // Update the refresh key (persisted).
            await this.persistRefreshToken(token.refresh_token);
            this.SESSION_REFRESH_TOKEN = token.refresh_token;

            // Update session access token.
            this.SESSION_ACCESS_TOKEN = token.access_token;

        } catch(e) {
            console.log('Error exchanging code for token.');
            console.log(e?.response?.data);
            console.log(e);
        }
        return token;
    }

    static userFromRequest(req) {
        let user = null;
        try {
            const bearer = req.headers.authorization;
            const token = bearer.split(' ')[1] || '';
            if (token)
                user = jwt.verify(token, process.env.CLIENT_SECRET);

        } catch(e) {
            // console.log('Failed to extract user.');
        }
        return user;
    }

    static async persistRefreshToken(refreshToken) {
        const query = {
            text: "UPDATE authentication SET token = $1 WHERE type = '" + this.REFRESH_TOKEN_KEY + "'",
            values: [refreshToken]
        };
        const result = await Database.connection.query(query);
        
        return result.rowCount === 1;
    }

    static async loadRefreshToken() {
        const query = {
            text: "SELECT * FROM authentication WHERE type = '" + this.REFRESH_TOKEN_KEY + "'",
        };
        const result = await Database.connection.query(query);
        return result.rows[0].token;
    }

    static async profile() {
        try {
            // Try to read some funkin' restream data that requires authentication.
            const url = 'https://api.restream.io/v2/user/profile';
            const response = await axios.get(url,
                {
                    headers: {
                        "Authorization": "Bearer " + this.SESSION_ACCESS_TOKEN
                    }
                }
            );
            return response.data;
        } catch(e) {
            console.log('Error loading profile.');
            console.error(e);
            return null;
        }
    }

    static async reset() {
        const query = {
            text: "UPDATE authentication SET token = $1 WHERE type = '" + this.REFRESH_TOKEN_KEY + "'",
            values: [null]
        };
        const result = await Database.connection.query(query);
        return result.rowCount === 1;
    }
};