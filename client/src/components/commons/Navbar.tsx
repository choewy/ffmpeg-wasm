import React from "react";
import { Link } from "react-router-dom";
import { userSignoutAction } from "../../actions/user.actions";

interface NavbarProps {
    user: {
        name: string,
        email: string,
        role: boolean,
        auth: boolean | null
    }
};

const Navbar: React.FC<NavbarProps> = (props) => {
    const {user} = props;

    const signoutClickHandler = async () => {
        await userSignoutAction();
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
                    <li><Link to="/chat">채팅</Link></li>
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