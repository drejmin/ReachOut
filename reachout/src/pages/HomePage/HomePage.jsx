import { useNavigate } from 'react-router-dom';

export default function HomePage({ user, setUser, room, setRoom, socket }){
  const navigate = useNavigate(); 

  function joinRoom () {
    if (room !== '' && user !== '') {
      socket.emit('join_room', { user, room });
    }

    navigate('/chat', { replace: true });
    
    return (
        <div>
          <div>
            <h1>{`Reach Out`}</h1>
            <input
            placeholder='User...'
            onChange={(evt) => setUser(evt.target.value)} 
            />

            <select
            onChange={(evt) => setRoom(evt.target.value)} 
            >
              <option>-- Select Room --</option>
              <option value='JokePage'>Joke Page</option>
              <option value='Mental Health'>Mental Health</option>
              <option value='Connect'>Connect</option>
              <option value='Group Meet'>Group Meet</option>
            </select>
    
            <button className='btn btn-secondary' onCLick={joinRoom()}>Join Room</button>
          </div>
        </div>
      );
    
}};