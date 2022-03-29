import {Server, Socket } from 'socket.io';
import { ChatService } from '../chat/chat.service';

export const AppSocketIo = (server: any) => {
    const io = new Server(server, {
        cors: {origin: "*", credentials: true}
    });

    io.on("connection", (socket: Socket) => {
        const chatService = new ChatService(socket);
    })
};