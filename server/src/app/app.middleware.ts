import { App } from './app.interface';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const AppMiddleware = (app: App) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(express.static('build'))
    app.use(cors({origin: "*", credentials: true}));
};