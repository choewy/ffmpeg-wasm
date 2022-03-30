import { Link } from "react-router-dom"

interface RoomCardProps {
    user: {
        _id: string,
        name: string,
        email: string,
        role: boolean,
        auth: boolean | null
    },
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

const RoomCard: React.FC<RoomCardProps> = (props) => {
    const {user, room} = props;
    const {_id, title, description, creator, members, createdAt} = room;

    return (
        <div>
            <h4>{title}</h4>
            <h6>{description}</h6>
            <p>방장 : {creator.name}</p>
            <p>참여수 : {members.length}</p>
            <p>생성일자 : {createdAt}</p>
            <Link to={`/rooms/${_id}`}>참여하기</Link>
        </div>
    );
};

export default RoomCard;