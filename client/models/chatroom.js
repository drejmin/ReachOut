import mongoose from "mongoose";

const RoomSchema = mongoose.Schema(
    {
        joined: Array,
    },
    {timestamps: true}

);

const Room = mongoose.model("Room", RoomSchema);

export default Room;