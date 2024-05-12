import IssueModel from "./issues.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const IssueSchema = new mongoose.Schema({

})

const IssueModel = mongoose.model("Issue", IssueSchema);
export default IssueModel;