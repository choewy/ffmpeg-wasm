import { Navigate } from "react-router-dom";

interface AuthRouteProps {
    Component: React.FC<any>;
    user: {
        auth: boolean | null;
        name: string;
        email: string;
        role: boolean;
    };
    reverse?: boolean;
};

const AuthRoute: React.FC<AuthRouteProps> = ({Component, user, reverse}) => {
    if (reverse) {
        if (user.auth === false) return <Component />;
        if (user.auth === true) return <Navigate to='/'/>;
    } else {
        if (user.auth === false) return <Navigate to='/signin'/>;
        if (user.auth === true) return <Component user={user}/>;
    }

    return <></>
};

export default AuthRoute;