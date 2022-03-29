import fs from 'fs';
import { FileConfig } from '../configs';
import { ChatErrors } from './chat.errors';

interface Sender {
    _id: string,
    email: string,
    password: string,
    name: string,
    role: boolean
};

interface MessageSchema {
    _id: string,
    text: string,
    createdAt: string,
    sender: Sender
};

interface MessageDoc {
    text: string,
    sender: Sender
};

// 아직 미구현
class Service {
    constructor(
        private dataPath: string = FileConfig('chat.data.json'),
        private incPath: string = FileConfig('chat.inc.json')
    ) {};

    private inc = (): string => {
        const inc = JSON.parse(fs.readFileSync(this.incPath, {encoding: 'utf-8'}));
        inc._inc += 1;

        try {
            fs.writeFileSync(
                this.incPath, JSON.stringify(inc), 
                {encoding: 'utf-8'}
            );
            return `${inc._inc}`;
        } catch (error) {
            throw ChatErrors.seqError;
        };
    };

    private dateFormat = (): string => {
        const date = new Date();
        return [
            date.getFullYear(), "-",
            `0${date.getMonth() + 1}`.slice(-2) + "-",
            `0${date.getDate()}`.slice(-2), " ",
            `0${date.getHours()}`.slice(-2), ":",
            `0${date.getMinutes()}`.slice(-2)
        ].join('');
    };

    getMessages = (): MessageSchema[]  => {
        try {
            return JSON.parse(
                fs.readFileSync(
                    this.dataPath,
                    {encoding: "utf-8" }
                )
            );
        } catch (error) {
            throw ChatErrors.loadError;
        }
    };

    setMessage = (
        doc: MessageDoc, 
        sender: Sender
    ): MessageSchema => {
        const _id: string = this.inc();

        try {
            const message: MessageSchema = {
                _id,
                ...doc,
                createdAt: this.dateFormat(),
                sender,
            };

            fs.writeFileSync(
                this.dataPath, 
                JSON.stringify(message), 
                {encoding: "utf-8"}
            );
            
            return message;

        } catch (error) {
            throw ChatErrors.saveError;
        };
    };
};

export const ChatService = new Service()