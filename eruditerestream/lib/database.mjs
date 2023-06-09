import Client from 'pg/lib/client.js';

export default class Database {
    static connection = null;

    static async connect() {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false
            }
        });
          
        await client.connect();

        client.on('error', e => console.error(e));

        this.connection = client;
    }
}