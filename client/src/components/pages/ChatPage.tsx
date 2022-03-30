import React from "react";

interface ChatPageProps {
    user: {
        name: string,
        email: string,
        role: boolean,
        auth: boolean | null
    }
};

const ChatPage:React.FC<ChatPageProps> = (props) => {
    const {user} = props;

    return <div>
        <p>채팅 페이지</p>
        <p>보수 중입니다...</p>
    </div>
};

export default ChatPage;