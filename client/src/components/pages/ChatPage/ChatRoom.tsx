import React from "react";

interface ChatRoomProps {
    room: {
        _id: string,
        title: string,
        description: string,
        creator: {
            _id: string,
            email: string,
            name: string
        },
        members: {
            _id: string,
            email: string,
            name: string
        }[],
        createdAt: string   
    }
};

const ChatRoom:React.FC<ChatRoomProps> = (props) => {
    const {room} = props;

    return (
        <div>
            <h1>채팅 페이지</h1>
            <p>방제 : {room.title}</p>
            <p>참여인원 : {room.members.length}</p>
        </div>
    );
};

export default ChatRoom;