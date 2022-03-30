import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignoutAction } from "../../actions/user.actions";

interface NavbarProps {
    user: {
        _id: string,
        name: string,
        email: string,
        role: boolean,
        auth: boolean | null
    },
    userAuthCheck: Function
};

const Navbar: React.FC<NavbarProps> = (props) => {
    const navigate = useNavigate();
    const {user, userAuthCheck} = props;

    const signoutClickHandler = async () => {
        await userSignoutAction();
        await userAuthCheck();
        return navigate('/signin');
    };
    
    if (user.auth === false) {
        return (
            <div>
                <ul>
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/signin">로그인</Link></li>
                    <li><Link to="/signup">회원가입</Link></li>
                </ul>
            </div>
        );
    };

    if (user.auth === true) {
        return (
            <div>
                <ul>
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/rooms">방목록</Link></li>
                    <li><Link to="/mypage">내정보</Link></li>
                </ul>
                <ul>
                    <li><button onClick={signoutClickHandler}>로그아웃</button></li>
                </ul>
            </div>
        );
    };
    
    return <></>
};

export default Navbar;