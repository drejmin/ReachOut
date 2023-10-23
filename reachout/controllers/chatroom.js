



// const chatroom = require ("../models/chatroom");

// // module.exports={
//     create: createRoom,
//     show: getUserRoom,
//     show: getRoomUsers,
// }

// async function createRoom(req,res){
//     const newRoom = new chatroom({
//         users:[req.body.senderId, req.body.receiverId]
//     });

//     try{
//         await newRoom.save();
//         res.status(200).json(newRoom);
//     } catch(error){
//         res.status(400).json({
//             message:error.message,
//         });
//     }
// };

// async function getUserRoom(req,res){
//     try{
//         const Room=await Room.find({
//             members: {$in: [req.params.userId]},
//         });
//         res.status(200).json(Room);
//     } catch(error){
//         res.status(400).json({
//             message: error.message,
//         });
//     }
// };

// async function getRoomUsers(req,res){
//     try{
//         const Room=await Room.find({
//             members: {$all: [req.params.userIdOne, req.params.userIdTwo]},
//         });
//         res.status(200).json(Room);
//     } catch(error){
//         res.status(400).json({
//             message: error.message,
//         });
//     }
// };

