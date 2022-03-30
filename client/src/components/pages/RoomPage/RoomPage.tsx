import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import RoomCreateForm from "./RoomCreateForm";

interface RoomPageProps {
    user: {
        _id: string,
        name: string,
        email: string,
        role: boolean,
        auth: boolean | null
    }
};

const TempRooms = [
    {
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
    }
];

const RoomPage:React.FC<RoomPageProps> = (props) => {
    const {user} = props;
    const [rooms, setRooms] = useState([...TempRooms]);

    useEffect(() => {
        // 방 목록 불러오기
        setRooms([...TempRooms]);
    }, []);

    return (
        <div>
            <RoomCreateForm user={user}/>
            <div>
                {rooms.map((room, index) => 
                    <RoomCard 
                        key={index}
                        user={user} 
                        room={room} />
                )}
            </div>
        </div>
    );
};

export default RoomPage;