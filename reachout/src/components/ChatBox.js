import SingleChat from "./SingleChat";
import {ChatState} from "../Context/ChatProvider";

export default function ChatBox ({ fetchAgain, setFetchAgain}){
    const {selectedChat} = ChatState();

    return(
        // create container for chatbox
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    )
}