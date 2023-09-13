const Message = require ("../models/message.js");

module.exports ={
    createMsg,
    getMsg,
}
async function createMsg(req, res){
    
    const newMsg = new Message(req.body);

    try{
        await newMsg.save();
        res.status(200).json(newMsg);
    } catch (error){
        res.status(400).json({
            message: error.message,
        });
    }
}

async function getMsg(req,res){
    try{
        const messages = await ChatMsg.find({
            RoomId: req.params.RoomId,
        });
        res.status(200).json(messages);
    }catch (error){
        res.status(400).json({
            message: error.message,
        });
    }
    
}


