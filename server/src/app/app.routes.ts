import path from 'path';
import { Request, Response, Router } from "express";
import UserRouter from "../user/user.router";
import { App } from "./app.interface"
import AdminRouter from '../admin/admin.router';

const AppRouter = Router();
AppRouter.get('*', (req: Request, res: Response)=>{
    const indexHTML = path.resolve(__dirname, '../build/index.html');
    return res.sendFile(indexHTML);
});

export const AppRoutes = (app: App, mode: string|undefined) => {
    app.use('/api/admin', AdminRouter);
    app.use('/api/auth', UserRouter);
    app.use('*', AppRouter);
};