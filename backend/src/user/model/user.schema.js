import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name is requires"],
        maxLength: [30, "user name can't exceed 30 characters"],
        minLength: [2, "name should have atleast 2 charcters"],
    },
    email: {
        type: String,
        required: [true, "user email is requires"],
        unique: true,
        validate: [validator.isEmail, "pls enter a valid email"],
    },
    number: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false,
    },
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel;