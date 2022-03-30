import React, { ChangeEvent, FormEvent, useState } from "react";

interface ChatSendProps {
    user: {
        _id: string,
        auth: boolean | null,
        name: string,
        email: string,
        role: boolean
    }
};

const InputProps = {
    message: {
        type: 'text',
        name: 'message',
        placeholder: '내용을 입력하세요.'
    }
};

const ChatSend:React.FC<ChatSendProps> = (props) => {
    const {user} = props;
    const [message, setMessage] = useState('');

    const messageChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {target: {value}} = e;
        setMessage(value);
    };

    const messageSendHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
    };

    return (
        <form onSubmit={messageSendHandler}>
            <div>
                <input 
                    {...InputProps.message}
                    value={message} 
                    onChange={messageChangeHandler}/>
            </div>
            <div>
                <button type="submit">보내기</button>
            </div>
        </form>
    );
};

export default ChatSend;