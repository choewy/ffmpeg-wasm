export interface UserSchema {
    _id: string,
    email: string,
    password: string,
    name: string,
    role: boolean,
    token: string,
    tokenExp: number
};

export interface UserDoc {
    email: string,
    password: string,
    name: string
};

export interface UserBody {
    email: string,
    password: string
};

export interface UserSign {
    _id: string,
    email: string,
    name: string,
    role: boolean,
    token: string,
    tokenExp: number
};