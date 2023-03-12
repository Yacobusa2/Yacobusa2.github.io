import cors from 'cors';
import express from 'express';

import Database from './lib/database.mjs';
import Auth from './lib/auth.mjs';
import Sessions from './lib/stream/sessions.mjs';

import routes from './lib/routes.mjs';

const app = express();
const port = process.env.PORT;

// Cross origin requests.
app.use(cors());

// Enable receiving form data.
app.use(express.json());

// Attach routes.
app.use(routes);

// Initiate web server.
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Connect to the database.
await Database.connect();

// Ensure/attempt authorisation.
await Auth.initialise();

// Start sessions if already logged in.
if (Auth.SESSION_ACCESS_TOKEN) {
    console.log('Logged in...');
    await Sessions.initialise();
}