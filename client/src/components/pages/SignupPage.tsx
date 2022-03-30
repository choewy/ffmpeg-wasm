import React, { ChangeEvent, FormEvent, useState } from "react";
import { userSignupAction } from "../../actions/user.actions";

interface SignupPageProps {
    userAuthCheck: Function
};

const InputProps = {
    name: {
        type: "text",
        name: "name",
        placeholder: "이름을 입력하세요."
    },
    email: {
        type: "text",
        name: "email",
        placeholder: "이메일을 입력하세요."
    },
    password: {
        type: "password",
        name: "password",
        placeholder: "비밀번호를 입력하세요."
    },
    confirmPassword: {
        type: "password",
        name: "confirmPassword",
        placeholder: "비밀번호를 입력하세요."
    }
};

const SignupPage:React.FC<SignupPageProps> = (props) => {
    const {userAuthCheck} = props;
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const formStateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const {name, value} = target;
        setFormState({...formState, [name]: value});
    };

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {name, email, password, confirmPassword} = formState;
        if (name === "") return alert('이름을 입력하세요.');
        if (email === "") return alert('이메일을 입력하세요');
        if (password === "") return alert('비밀번호를 입력하세요.');
        if (password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');

        const signupBody = {name, email, password};
        const {ok, message} = await userSignupAction(signupBody);
        if (!ok) return alert(message);
        return await userAuthCheck();
    };

    return (
        <div>
            <h1>회원가입 페이지</h1>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <input
                        {...InputProps.name}
                        value={formState.name}
                        onChange={formStateChangeHandler}/>
                </div>
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
                    <input
                        {...InputProps.confirmPassword}
                        value={formState.confirmPassword}
                        onChange={formStateChangeHandler}/>
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;