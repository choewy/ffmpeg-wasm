import { UserDoc, UserBody, UserSchema, UserSign } from './user.entities';
import { AuthConfig, FileConfig } from '../configs';
import { UserErrors } from './user.errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const {jwtSecret, saltRounds} = AuthConfig();

class Service {
    constructor(
        private dataPath: string = FileConfig('user.data.json'),
        private incPath: string = FileConfig('user.inc.json'),
        private users: UserSchema[] = JSON.parse(fs.readFileSync(dataPath, {encoding: 'utf-8'})),
        private _inc: number = JSON.parse(fs.readFileSync(incPath, {encoding: 'utf-8'}))._inc,
    ) {};

    private inc = (): string => {
        const inc = this._inc;
        this._inc += 1;
        try {
            fs.writeFileSync(
                this.incPath, JSON.stringify({_inc: this._inc}),
                {encoding: 'utf-8'}
            );
            return `${inc}`;
        } catch (error) {
            throw UserErrors.seqError;
        };
    };

    private userById = (_id: string): UserSchema => {
        const user = this.users.find(user => user._id === _id);
        if (!user) throw UserErrors.notFoundError;
        return user;
    }

    private userByEmail = (email: string): UserSchema => {
        const user = this.users.find(user => user.email === email);
        if (!user) throw UserErrors.notFoundError;
        return user;
    };

    private duplicated = (email: string): boolean => {
        try {
            this.userByEmail(email);
            return true
        } catch (error) {
            return false
        }
    };

    private generateToken = (user: UserSchema): UserSign => {
        const {_id} = user;
        user.token = jwt.sign(_id, jwtSecret);
        user.tokenExp = 3600;
        this.users = this.users.map(db_user => db_user._id === _id ? user : db_user);

        try {
            fs.writeFileSync(this.dataPath, JSON.stringify(this.users), {encoding: 'utf-8'});
        } catch {
            throw UserErrors.saveError;    
        }

        const {email, name, role, token, tokenExp} = user;
        return {_id, name, email, role, token, tokenExp};
    };

    signUpUser = async (
        doc: UserDoc
    ): Promise<UserSign> => {
        const {email, password} = doc;
        if (this.duplicated(email)) {
            throw UserErrors.duplicateError;
        };
        const _id: string = this.inc();
        const salt = await bcrypt.genSalt(saltRounds);
        doc.password = await bcrypt.hash(password, salt);

        const user: UserSchema = {
            _id,
            ...doc,
            role: false,
            token: '',
            tokenExp: 0
        };
        this.users.push(user);

        try {
            return this.generateToken(user);
        } catch (error) {
            throw UserErrors.saveError;
        };
    };

    signInUser = async (body: UserBody): Promise<UserSign> => {
        const {email, password} = body;
        const user = this.userByEmail(email);
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw UserErrors.passwordError;
        return this.generateToken(user);
    };

    signOutUser = (_id: string) => {
        const user = this.userById(_id);
        user.token = "";
        user.tokenExp = 0;
        this.users = this.users.map(db_user => db_user._id === _id ? user : db_user);
        try {
            fs.writeFileSync(this.dataPath, JSON.stringify(this.users), {encoding: 'utf-8'});
        } catch {
            throw UserErrors.saveError;
        };
    }

    tokenVerify = (token: string): UserSign => {
        try {
            const _id = jwt.verify(token, jwtSecret);
            const user = this.users.find(user => user._id === _id && user.token === token);
            if (user) {
                return user;
            } else {
                throw UserErrors.tokenError;
            }
        } catch {
            throw UserErrors.tokenError;
        };
    };
};

export const UserService = new Service();