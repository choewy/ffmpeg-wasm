import { Navigate } from "react-router-dom";

interface AuthRouteProps {
    Component: React.FC<any>;
    user: {
        _id: string,
        auth: boolean | null;
        name: string;
        email: string;
        role: boolean;
    };
    userAuthCheck: Function;
    reverse?: boolean;
};

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
    const {Component, user, userAuthCheck, reverse} = props;

    if (reverse) {
        if (user.auth === false) return <Component userAuthCheck={userAuthCheck} />;
        if (user.auth === true) return <Navigate to='/'/>;
    } else {
        if (user.auth === false) return <Navigate to='/signin'/>;
        if (user.auth === true) return <Component user={user} userAuthCheck={userAuthCheck}/>;
    }

    return <></>
};

export default AuthRoute;