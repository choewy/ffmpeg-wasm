import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "socket.io-client";
import ChatRoom from "./ChatRoom";
import ChatSend from "./ChatSend";

interface ChatPageProps {
    user: {
        _id: string;
        auth: boolean | null;
        name: string;
        email: string;
        role: boolean;
    }
};

const TempRoom = {
    _id: "1",
    title: "임시 방 생성",
    description: "나중에 사라질 방입니다.",
    creator: {
        _id: "0",
        email: "choewy32@gmail.com",
        name: "최원영"
    },
    members: [
        {
            _id: "0",
            email: "choewy32@gmail.com",
            name: "최원영"
        }
    ],
    createdAt: "2022-03-30 14:15"
};

const URL = process.env.NODE_ENV === 'production' 
  ? `https://${window.location.host}`
  : "http://localhost:5000";
  
const socket = connect(URL);

const ChatPage:React.FC<ChatPageProps> = (props) => {
    const {user} = props;
    const params = useParams();
    const room_id = params._id;
    const [room, setRoom] = useState({...TempRoom});
    const [messages, setMessages] = useState([]);

    const setCurrentRoom = async () => {
        setRoom({...TempRoom});
    };
    
    const getMessages = () => {
        setMessages([]);
    };

    useEffect(() => {
        setCurrentRoom();
    }, []);

    return (
        <div>
            <ChatRoom room={room}/>
            <ChatSend user={user}/>
        </div>
    );
};

export default ChatPage;