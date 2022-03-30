import React, { ChangeEvent, FormEvent, useState } from "react";

interface RoomCreateFormProps {
    user: {
        name: string,
        email: string,
        role: boolean,
        auth: boolean | null
    }
};

const InputProps = {
    title: {
        type: 'text',
        name: "title",
        placeholder: "방 제목"
    },
    description: {
        type: "text",
        name: "description",
        placeholder: "방 소개"
    }
}

const RoomCreateForm: React.FC<RoomCreateFormProps> = (props) => {
    const {user} = props;
    
    const [room, setRoom] = useState({
        title: '',
        description: ''
    });
    const roomNameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        setRoom({...room, [name]: value});
    };

    const roomSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("방 생성 및 방 참여");
    };

    return (
        <form onSubmit={roomSubmitHandler}>
            <div>
                <input 
                    {...InputProps.title}
                    value={room.title} 
                    onChange={roomNameChangeHandler}/>
            </div>
            <div>
                <input 
                    {...InputProps.description}
                    value={room.description} 
                    onChange={roomNameChangeHandler}/>
            </div>
        </form>
    );
};

export default RoomCreateForm;