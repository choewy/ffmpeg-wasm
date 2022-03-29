import { User } from "./user.model";
import { CookieConfig } from "../configs";
import { NextFunction, Request, Response } from "express";
import { UserSign } from "./user.entities";

const {tokenKey} = CookieConfig();

export const AuthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.cookies[tokenKey];
        const user: UserSign | undefined = User.tokenVerify(token);
        req.token = token;
        req.user = user;
    } catch (error: any) {
        const { message } = error;
        return res.json({ auth: false, message });
    }

    next();
};
