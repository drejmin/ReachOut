const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        RoomId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chatroom"
        },
        isGroupChat:{type:Boolean, default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        content: String,
        latestMessage: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        chatName:{type:String, trim:true},

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



module.exports = mongoose.model('Chat',ChatSchema)