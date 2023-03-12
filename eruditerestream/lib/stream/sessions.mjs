import WebSocket from 'ws';
import Auth from "../auth.mjs";
import Chat from './chat.mjs';

export default class Sessions {
    static SESSION_UPDATE_SOCKET = null;
    static CURRENT_SESSION = null;
    
    // Setup a websocket to try to immediately intercept future stream state changes 
    // and request current stream data.
    static async initialise() {
        console.log('Watching for sessions...');
        
        const url = `wss://streaming.api.restream.io/ws?accessToken=${Auth.SESSION_ACCESS_TOKEN}`;
        this.SESSION_UPDATE_SOCKET = new WebSocket(url);

        this.SESSION_UPDATE_SOCKET.onmessage = msg => {
            const update = JSON.parse(msg.data);

            console.log('Session update socket event');
            console.log(update);
            
            // The below line of code would work but would be significant overkill.
            // this.check()
        };

        // Set up an interval to check if stream started/ended (5 minutes?).
        setInterval(() => this.check(), (1000 * 60) * 5);

        // Check if there is a current session ongoing
        await this.check();
    }

    static async channels() {
        const allChannels = await Auth.get('https://api.restream.io/v2/user/channel/all');
        let channels = await Promise.all(
            allChannels.map(c => Auth.get(`https://api.restream.io/v2/user/channel/${c.id}`))
        );

        channels = channels.filter(c => c.active);

        return channels;
    }

    static async check() {
        console.log('Checking if raghead is streaming...');

        // Check if no previous active channels and then starting.
        // Check if previously active channels and then none (ended).

        // Create a session if any channels are active.
        const channels = await this.channels();
        // console.log(channels);

        // TODO: Check if any of these channels are streaming.

        // TODO:
        // Channels fail to show whether streamer be strimmin'.
        // Upcoming Events
        // In Progress Events
        // Event
        
        
        // if (channels.length) {
        //     this.CURRENT_SESSION = {
        //         last_active: Date.now(),
        //         channels
        //     };

        //     // Start listening to chat.
        //     Chat.listen();
    
        //     console.log(this.CURRENT_SESSION);
        // }
    }

    static close() {
        // this.UPDATE_SOCKET.disconnect();
    }

};