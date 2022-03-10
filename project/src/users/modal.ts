import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema( {
    name: String,
    email: String,
    rollNumber: Number,
    phoneNumber: Number,
    password: String,
    isAdmin: { 
        type: Boolean,
        default: false
    },
    profilePicture: String,
    googleId: String,
    stratergy: String,
})