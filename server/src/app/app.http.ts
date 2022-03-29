import http from 'http';
import {Server, Socket } from 'socket.io';
import { ChatService } from '../chat/chat.service';

export const AppHttpServer = (app: any) => {
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {origin: "*", credentials: true}
    });

    io.on("connection", (socket: Socket) => {
        const chatService = new ChatService(socket);
    })
};