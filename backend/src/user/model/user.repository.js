import mongoose from "mongoose";
import UserModel from "./user.schema.js";

// Save a user in db.
export const createNewUserRepo = async (user) => {
    return await new UserModel(user).save();
}