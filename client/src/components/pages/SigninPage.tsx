import React, { ChangeEvent, FormEvent, useState } from "react";
import { userSigninAction } from "../../actions/user.actions";

const InputProps = {
    email: {
        type: "text",
        name: "email",
        placeholder: "이메일을 입력하세요."
    },
    password: {
        type: "password",
        name: "password",
        placeholder: "비밀번호를 입력하세요."
    }
};

interface SigninPageProps {
    userAuthCheck: Function
};

const SigninPage:React.FC<SigninPageProps> = (props) => {
    const {userAuthCheck} = props;
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    const formStateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const {name, value} = target;
        setFormState({...formState, [name]: value});
    };

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {email, password} = formState;
        if (email === "") return alert("이메일을 입력하세요.");
        if (password === "") return alert("비밀번호를 입력하세요.");

        const signinBody = {email, password};
        const {ok, message} = await userSigninAction(signinBody);
        if (!ok) return alert(message);
        return await userAuthCheck();
    };

    return (
        <div>
            <h1>로그인 페이지</h1>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <input
                        {...InputProps.email}
                        value={formState.email}
                        onChange={formStateChangeHandler}/>
                </div>
                <div>
                    <input
                        {...InputProps.password}
                        value={formState.password}
                        onChange={formStateChangeHandler}/>
                </div>
                <div>
                    <button type="submit">로그인</button>
                </div>
            </form>
        </div>
    );
};

export default SigninPage;