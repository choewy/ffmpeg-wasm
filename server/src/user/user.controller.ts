import { Request, Response } from "express";
import { CookieConfig } from "../configs";
import { UserDoc, UserBody, UserSign } from "./user.entities";
import { User } from "./user.model";

const {tokenKey, tokenExp} = CookieConfig()

class Controller {
    auth = (req: Request, res: Response) => {
        return res.status(200).json({
            name: req.user?.name,
            email: req.user?.email,
            role: req.user?.role,
            auth: true
        });
    };

    signUp = async (req: Request, res: Response) => {
        const doc: UserDoc = req.body;
        try {
            const user: UserSign = await User.signUpUser(doc);
            res.cookie(tokenExp, user.tokenExp);
            res.cookie(tokenKey, user.token);
            return res.status(200).json({ok: true});
        } catch (error: any) {
            const {message} = error;
            return res.json({ok: false, message});
        };
    };

    signIn = async (req: Request, res: Response) => {
        const body: UserBody = req.body;
        try {
            const user: UserSign = await User.signInUser(body);
            res.cookie(tokenExp, user.tokenExp);
            res.cookie(tokenKey, user.token);
            return res.status(200).json({ok: true});
        } catch (error: any) {
            const {message} = error;
            return res.json({ok: false, message});
        };
    };

    signOut = async (req: Request, res: Response) => {
        try {
            const user = req.user;
            const _id = user ? user._id : '';
            User.signOutUser(_id);
            return res.status(200).json({ok: true});
        } catch (error:any) {
            const {message} = error;
            return res.json({ok: false, message});
        };
    };
};

export const UserController = new Controller();