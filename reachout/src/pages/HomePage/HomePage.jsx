import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react";
import LoginForm from "../../components/Authentication/LoginForm/LoginForm";
import SignUpForm from "../../components/Authentication/SignUp/SignUpForm";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;

// import { useNavigate } from 'react-router-dom';

// export default function HomePage({ user, setUser, room, setRoom, socket }){
//   const navigate = useNavigate(); 

//   function joinRoom () {
//     if (room !== '' && user !== '') {
//       socket.emit('join_room', { user, room });
//     }

//     navigate('/chat', { replace: true });
    
//     return (
//         <div>
//           <div>
//             <h1>{`Reach Out`}</h1>
//             <input
//             placeholder='User...'
//             onChange={(evt) => setUser(evt.target.value)} 
//             />

//             <select
//             onChange={(evt) => setRoom(evt.target.value)} 
//             >
//               <option>-- Select Room --</option>
//               <option value='JokePage'>Joke Page</option>
//               <option value='Mental Health'>Mental Health</option>
//               <option value='Connect'>Connect</option>
//               <option value='Group Meet'>Group Meet</option>
//             </select>
    
//             <button className='btn btn-secondary' onCLick={joinRoom()}>Join Room</button>
//           </div>
//         </div>
//       );
    
// }};