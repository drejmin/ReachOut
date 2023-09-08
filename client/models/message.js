import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
    {
        RoomId: String,
        user: String,
        content: String,

    },
    {timestamps: true}
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;