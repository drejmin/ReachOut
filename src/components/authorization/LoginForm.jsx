// import { useState } from 'react';
// import * as usersService from '../../utilities/users-service';


// export default function LoginForm({setUser}) {
  
//   const [error, setError] = useState('');
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: ''
//   });
  

//   function handleChange(evt) {
//     setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
//     setError('');
//   }

//   async function handleSubmit(evt){
//     evt.preventDefault();
//     console.log('logging in');
//     try {
//       // The promise returned by the signUp service method 
//       // will resolve to the user object included in the
//       // payload of the JSON Web Token (JWT)
//       const user = await usersService.login(credentials);
//       setUser(user);
//     } catch {
//       setError('Log In Failed - Try Again');
//     }
//   };

//   return (
//     <div>
//       <div className="form-container">
//         <form autoComplete='off' onSubmit={handleSubmit}>
//           <label>Username</label>
//           <input
//             type={"text"}
//             name='username'
//             onChange={handleChange} 
//             value={(credentials.username)}
//             placeholder="Enter Username"
//             required
//           />
//           <label>Password</label>
//           <input
//             type={"password"}
//             name='password'
//             value={credentials.password}
//             onChange={handleChange}
//             placeholder="Enter Password"
//             required
//           />
//           <button type="submit">LOG IN</button>
//         </form>
//     </div>
//       <p className="error-message">&nbsp;{error}</p>
//     </div>
//   );
// }
import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials(credentials => ({ ...credentials, [name]: value }));
    if (error) setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Enter Username"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        <button type="submit">LOG IN</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
