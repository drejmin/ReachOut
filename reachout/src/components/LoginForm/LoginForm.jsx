import { useState, useEffect } from "react";
import { Router, Route, Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../RegisterForm/RegisterForm";

export default function Login() {
  const navigate = useNavigate();
  const RegisterForm = ()=><h2>Register</h2>

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, login, setError } = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (e) {
      console.log("Failed to login");
    }

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
              <Link to= '/register'>
                Don't have an account? Register
              </Link>
            </div>
          </div>
        </form>
  <div path='/register' component = {<RegisterForm/>}/>
      </div>
    </div>
  );
}