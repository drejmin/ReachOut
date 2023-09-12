
import { useNavigate } from 'react-router-dom';


export default function HomePage({ user, setUser, room, setRoom, socket }){
  const navigate = useNavigate(); 

  const joinRoom = () => {
    if (room !== '' && user !== '') {
      socket.emit('join_room', { user, room });
    }

    navigate('/chat', { replace: true });
    
    return (
        <div>
          <div>
            <h1>{`<>DevRooms</>`}</h1>
            <input
            placeholder='User...'
            onChange={(evt) => setUser(evt.target.value)} 
            />

            <select
            className={styles.input}
            onChange={(evt) => setRoom(evt.target.value)} 
            >
              <option>-- Select Room --</option>
              <option value='javascript'>JavaScript</option>
              <option value='node'>Node</option>
              <option value='express'>Express</option>
              <option value='react'>React</option>
            </select>
    
            <button className='btn btn-secondary'>Join Room</button>
          </div>
        </div>
      );
    
}};