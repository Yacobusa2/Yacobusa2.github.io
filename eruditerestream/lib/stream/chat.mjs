import WebSocket from 'ws';
import Auth from '../auth.mjs';
import AnsweringHelper from '../tests/answeringHelper.mjs';

export default class Chat {

    static CHAT_SOCKET = null;

    static CURRENT_QUESTION = null;
    
    static listen() {
        const url = `wss://chat.api.restream.io/ws?accessToken=${Auth.SESSION_ACCESS_TOKEN}`;
        this.CHAT_SOCKET = new WebSocket(url);
        
        this.CHAT_SOCKET.onmessage = ({ data }) => {
            const msg = JSON.parse(data);
            const author = msg.payload?.eventPayload?.author;
            // If 1 or 2 [or variant] and there's an active question, save.
            if (author) this.processChatMessage(msg, author);
        };
        
        this.CHAT_SOCKET.onerror = console.error;
    }

    static processChatMessage(msg) {
        if (AnsweringHelper.isValidAnswer(msg)) {
            // TODO: Save...
        }
    }

    static close() {
    }

};