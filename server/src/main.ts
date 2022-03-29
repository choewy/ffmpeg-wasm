
import express from 'express';
import cors from 'cors';
import {Server } from 'socket.io';
import http from 'http';

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
}

interface SendPayload {
    type: string,
    id: string,
    name: string,
    enter: boolean,
    text: string
}

const appData: AppData = {
    sockets: [],
    messages: []
};

const NODE_ENV = process.env.NODE_ENV;
const PORT = NODE_ENV === "production" 
    ? process.env.PORT || 3000 
    : 5000;

const app = express();
app.use(cors({origin: "*", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (NODE_ENV !== "production") {
    app.get('/', (req, res)=>{
        res.json(appData);
    });
};

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'))
    app.get('*', (req, res)=>{
        res.sendFile(__dirname + '/build/index.html');
    });
};

httpServer.listen(PORT, () => {
    console.log('server ruuning');
});