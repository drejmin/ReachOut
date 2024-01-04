import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import ChatRoomPage from '../ChatRoomPage/ChatRoomPage';

export default function App() {

      return (
        <div className="App">
            <Router>
                <div>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/chats" component={ChatRoomPage} />
                </div>
            </Router>
        </div>
      );
    }

    
      
