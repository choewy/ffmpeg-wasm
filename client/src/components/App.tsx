import { useEffect, useState } from "react";
import { connect } from "socket.io-client";

const WSS_URL = process.env.NODE_ENV === 'production' 
  ? `http://${window.location.host}`
  : "http://localhost:5000";

const socket = connect(WSS_URL);

interface InputEvent {
  target: {
    name: string,
    value: string
  }
};

interface SubmitEvent {
  preventDefault: Function
};

interface Message {
  type: string,
  name: string,
  text: string,
  datetime: Date
};

interface NoticePayload {
  count: number,
  message: Message
};

interface LoadPayload {
  count: number,
  messages: Message[]
};

interface PushPayload {
  message: Message
};

interface CurrentRoom {
  count: number,
  messages: Message[]
};

const ininCurrentRoom: CurrentRoom = {
  count: 0,
  messages: []
}

const App = () => {
  const [currentRoom, setCurrentRoom] = useState({
    ...ininCurrentRoom
  });

  const [state, setState] = useState({
    id: '',
    name: '',
    enter: false
  });

  const [text, setText] = useState('');
  
  useEffect(() => {
    const callback = (payload: NoticePayload) => {
      const {count, message} = payload;
      const {messages} = currentRoom;
      setCurrentRoom({count, messages: [...messages, message]});
    };
    socket.on('notice', callback);

    return () => {
      socket.off('notice', callback);
    };
  }, [currentRoom]);

  useEffect(() => {
    const callback = (payload: PushPayload) => {
      const {message} = payload;
      const {messages} = currentRoom;
      console.log(message);
      setCurrentRoom({...currentRoom, messages: [...messages, message]});
    };
    socket.on('push', callback);

    return () => {
      socket.off('push', callback);
    };
  }, [currentRoom]);
  
  const nameChangeHandler = (e: InputEvent) => {
    const {target: {name, value}} = e;
    setState({...state, [name]: value});
  };

  const nameSubmitHandler = (e: SubmitEvent) => {
    e.preventDefault();
    socket.emit('join', state.name, (payload: LoadPayload) => {
      setState({...state, id: socket.id, enter: true});
      setCurrentRoom({...payload});
    });
  };

  const textChangeHandler = (e: InputEvent) => {
    const {target: {value}} = e;
    setText(value);
  };

  const textSubmitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    socket.emit('send', {...state, text}, (message: Message) => {
      const {messages} = currentRoom;
      setCurrentRoom({...currentRoom, messages: [...messages, message] });
      setText('');
    });
  };

  return (
    <div>
      WelCome!
      {
        !state.enter 
        ? (
          <form onSubmit={nameSubmitHandler}>
        <input 
          name="name" 
          value={state.name} 
          onChange={nameChangeHandler}
          placeholder="이름을 입력하세요." />
          <input type="submit" value="완료"/>
      </form>
        ) : (<>
          <div>
            <div>현재 접속 중 : {currentRoom.count}명</div>
            {
              currentRoom.messages.map((message, index) => {
                const {type, name, text, datetime} = message;
                return <p key={index}>
                  {type === "notice" 
                    ? text 
                    : `${name}(${datetime}) : ${text}`}
                    </p>
              })
            }
          </div>
          <form onSubmit={textSubmitHandler}>
            {state.name} : <input
              value={text} 
              onChange={textChangeHandler}
              placeholder="메시지를 입력하세요."/>
            <input type="submit" value="보내기"/>
          </form>
        </>)
      }
    </div>
  );
};

export default App;