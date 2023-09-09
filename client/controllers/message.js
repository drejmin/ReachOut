import Message from "../models/message.js";

export const createMessage = async(req, res)=>{
    const newMessage = new Message(req.body);

    try{
        await newMessage.save();
        res.status(201);
    } catch (error){
        res.status(401);
    }
}

