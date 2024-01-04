const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema =new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        },
    firstname: {
        type: String,
        required: true,
        unique: true,
        },
    lastname: {
        type: String,
        required: true,
        unique: true,
        },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    }, 
    avatar:{
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false,
    },
},{
    timestamps: true,
    toJSON:{
        transform: function(doc,ret){
            delete ret.password;
            return ret;
        }
    },
});

userSchema.methods.matchPassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next){
    if (!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('User', userSchema);
