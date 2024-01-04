const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        RoomId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chatroom"
        },
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        content:{
            type:String,
             trim:true,
            required: true},
        chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat"
        },
    },{
        timestamps: true,
        toJSON:{
            transform: function(doc,ret){
                delete ret.password;
                return ret;
            }
        },  
    }
);

module.exports = mongoose.model('Message',MessageSchema)