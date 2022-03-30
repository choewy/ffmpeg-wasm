import { Request, Response, Router } from "express";
import UserRouter from "../user/user.router";
import { App } from "./app.interface"

const AppRouter = Router();
AppRouter.get('*', (req: Request, res: Response)=>{
    console.log(`=========================`);
    console.log(`====       GET *     ====`);
    console.log(`=========================`);
    res.sendFile(__dirname + '/build/index.html');
});

export const AppRoutes = (app: App, mode: string|undefined) => {
    app.use('/api/auth', UserRouter);
    app.use('*', AppRouter);
};