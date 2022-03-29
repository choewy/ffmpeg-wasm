import { Socket } from "socket.io";

export class ChatService {
    constructor(private socket: Socket) {}

    onJoinRoom (name: string, hook: Function) {
        const id = this.socket.id;
        
    };
};

