import { Link, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {ChatState} from "../../Context/ChatProvider";
import { useToast } from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();
  const SignUpForm = ()=><h2>SignUp</h2>

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, login, setError } = useState("");

  const history = useHistory();
  const {setUser} = ChatState();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleFormSubmit() {
    setLoading(true);
    if (!email || !password) {
      toast({
        title:"Please Fill all Fields",
        status:"Warning",
        duration:5000,
        isClosable:true,
        position:"bottom",

      });
    setLoading(false);
    return;
    }

    try {
      const config ={
        headers:{
          "Content-type":"application/json",
        },
      };

    const {data} = await axios.post(
      "/api/user/login",
      {email, password},
      config
    );

    toast({
      title: "Login Successful",
      status:"success",
      duration:5000,
      isClosable:true,
      position:"bottom",
    });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    history.push("/chats");
  } catch(error){
    toast({
      title:"Input Error",
      description: error.response.data.message,
      status:"error",
      duration: 5000,
      isClosable:true,
      position:"bottom",
    });
    setLoading(false);
  }

  return (
    <div>
      <div>
        <div>
          <h2>
            Login to your account
          </h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
            >
              Login
            </button>
          </div>
          <div>
            <div>
              <Link to= '/SignUp'>
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </form>
  <div path='/SignUp' component = {<SignUpForm/>}/>
      </div>
    </div>
  );
}};