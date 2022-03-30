import axios from "axios";

interface SigninBody {
    email: string;
    password: string;
};

interface SignupBody extends SigninBody{
    name: string;
};

export const userAuthAction = async () => {
    const {data} = await axios.get('/api/auth');
    return data;
};

export const userSignupAction = async (body: SignupBody) => {
    const {data} = await axios.post('/api/auth/signup', body);
    return data;
};

export const userSigninAction = async (body: SigninBody) => {
    const {data} = await axios.post('/api/auth/signin', body);
    return data;
};

export const userSignoutAction = async () => {
    const {data} = await axios.delete('/api/auth/signout');
    return data;
};