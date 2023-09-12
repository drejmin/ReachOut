import MessagesReceived from '../../services/MsgService';
import MsgSend from '../../services/MsgSend';

export default function ChatPage({ socket }){
  return (
    <div>
      <div>
        <MessagesReceived socket={socket} />
        <MsgSend socket={socket} user={user} room={room} />
      </div>
    </div>
  );
};
