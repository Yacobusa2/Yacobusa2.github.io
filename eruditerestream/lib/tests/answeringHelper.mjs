import Chat from "../stream/chat.mjs";

export default class AnsweringHelper {

    static isValidAnswer(answer) {
        console.log('Checking if valid answer ', answer);
        console.log(Chat.CURRENT_QUESTION);
    }
}