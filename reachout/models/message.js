const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        RoomId: String,
        user: String,
        content: String,

    },
    {timestamps: true}
);



module.exports = mongoose.model('Message',MessageSchema)