import { Request, Response } from "express";
import { FileConfig } from "../configs";
import fs from 'fs';

const userDataPath: string = FileConfig('user.data.json');
const userIncPath: string = FileConfig('user.inc.json');

class Controller {
    users = (req: Request, res: Response) => {
        if (req.user?.role === true) {
            const users = {
                ok: true,
                data: JSON.parse(fs.readFileSync(userDataPath, {encoding: 'utf-8'})),
                inc: JSON.parse(fs.readFileSync(userIncPath, {encoding: 'utf-8'})),
            };
            return res.json(users);
        }
        return res.json({ok: false, message: "요청 권한이 없습니다."});
    };
};

export const AdminController = new Controller();