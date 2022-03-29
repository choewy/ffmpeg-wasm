import { Request, Response } from "express";
import UserRouter from "../user/user.router";
import { App } from "./app.interface"

export const AppRoutes = (app: App, mode: string|undefined) => {
    app.use('/api/auth', UserRouter);
    if (mode === "production") {
        app.get('*', (req: Request, res: Response)=>{
            res.sendFile(__dirname + '/build/index.html');
        });
    };
};