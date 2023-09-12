const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = mongoose.Schema(
    {
        joined: Array,
    },
    {timestamps: true}

);

const Room = mongoose.model("Room", RoomSchema);

export default Room;