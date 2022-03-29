import path from 'path';

export const AppConfig = () => {
    if (process.env.NODE_ENV === "production") {
        return {
            mode: "production",
            port: process.env.PORT
        }
    } else {
        return {
            mode: "development",
            port: 5000
        }
    }
};

export const FileConfig = (fileName: string) => {
    return path.resolve(`${__dirname}`, '../db', fileName);
};

export const AuthConfig = () => {
    return {
        jwtSecret: "JsonWebTokenSecret",
        saltRounds: 10
    };
};

export const CookieConfig = () => {
    return {
        tokenKey: "appToken",
        tokenExp: "appTokenExp"
    };
};