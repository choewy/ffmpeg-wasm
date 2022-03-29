import express from 'express';
import {Server } from 'socket.io';
import http from 'http';
import { AppMiddleware } from './app/app.middleware';
import { AppRoutes } from './app/app.routes';
import { AppConfig } from './configs';

export interface App {
    use: Function,
    get: Function,
};

interface AppData {
    sockets: {
        id: string, 
        name: string
    }[],
    messages: {
        id: string,
        type: string,
        name: string,
        text: string,
        datetime: Date
    }[],
};

interface SendPayload {
    type: string,
    id: string,
    name: string,
    enter: boolean,
    text: string
};

const appData: AppData = {
    sockets: [],
    messages: []
};

const {mode, port} = AppConfig();
const app = express();

AppMiddleware(app);
AppRoutes(app, mode);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {origin: "*", credentials: true}
});

io.on("connection", (socket: any) => {
    socket.on('join', (name: string, callback: Function) => {
        const {id} = socket;
        appData.sockets.push({id, name});
        socket.join('room');
        const message = {
            id: "admin",
            type: "notice",
            name: "알림",
            text: `${name}님이 입장하셨습니다.`,
            datetime: new Date()
        };
        appData.messages.push(message);

        const loadPayload = {
            count: appData.sockets.length, 
            messages: appData.messages
        };
        callback(loadPayload);

        const roomPayload = {
            count: appData.sockets.length, 
            message
        }
        socket.to('room').emit("notice", roomPayload);
    });

    socket.on('send', (payload: SendPayload, callback: Function) => {
        const{ id, name, text} = payload;
        const message = {
            type: "message",
            id, name, text,
            datetime: new Date()
        };
        appData.messages.push(message);
        const pushPayload = {message};
        socket.to('room').emit('push', pushPayload);
        callback(message);
    });

    socket.on('disconnect', () => {
        const {id} = socket;
        const found = appData.sockets.find(sc => sc.id === id);
        if (found) {
            appData.sockets = appData.sockets.filter(sckt => sckt.id !== id);
            const message = {
                id: "admin",
                type: "notice",
                name: "알림",
                text: `${found.name}님이 퇴장하셨습니다.`,
                datetime: new Date()
            };
            const payload = {
                count: appData.sockets.length, 
                message
            };
            socket.to('room').emit('notice', payload);
            appData.messages.push(message);
        };
    });
});

httpServer.listen(port, () => {
    console.log('server ruuning');
});