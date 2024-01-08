const Message = require ("../models/message.js");
const User = require("../models/user.js");
const Chat = require("../models/chat.js");



async function allMsgs(req,res){
    try{
        const messages = await Message.find({ chat: req.params.chatId})
            .populate("sender", "name avatar email")
            .populate("chat");
        res.json(messages);
    } catch (error){
        res.status(400);
        throw new Error(error.message)
    }
}

async function sendMsg(req, res){
    const {content, chatId} = req.body;

    if (!content || !chatId){
        console.log("Invalid Data Requested");
        return res.sendStatus(400);
    }

    var newMsg = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMsg);

        message = await message.populate("sender", "name avatar"). execPopulate();
        message = await message.populate("chat"). execPopulate();
        message = await User.populate(message, {
            path: "chat.users",
            select: "name avatar email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});

        res.json(message);
    } catch(error){
        res.status(400);
        throw new Error(error.message);
    }
    };

    module.exports = { 
        allMsgs,
        sendMsg,
    };
    
// module.exports ={
//     createMsg,
//     getMsg,
// }
// async function createMsg(req, res){
    
//     const newMsg = new Message(req.body);

//     try{
//         await newMsg.save();
//         res.status(200).json(newMsg);
//     } catch (error){
//         res.status(400).json({
//             message: error.message,
//         });
//     }
// }

// async function getMsg(req,res){
//     try{
//         const messages = await ChatMsg.find({
//             RoomId: req.params.RoomId,
//         });
//         res.status(200).json(messages);
//     }catch (error){
//         res.status(400).json({
//             message: error.message,
//         });
//     }
    
// }


