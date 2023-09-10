import chatroom from "../models/chatroom";

export const createChatRoom = async (req,res)=>{
    const newRoom = new chatroom({
        users:[req.body.senderId, req.body.receiverId]
    })
}