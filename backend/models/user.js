import mongoose from "mongoose";

const userSchema = {
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: new Date()}
};

const user = mongoose.model('User', userSchema);

export default user;