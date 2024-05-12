import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const IssueSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Project Name is required"]
    },
    description: {
        type: String,
        required: [true, "Project Description is required"]
    },
    label: {
        type: String,
        required: true,
        enum: ["UI", "Bug", "Development", "Backend", "Frontend", "Database"]
    },
    author: {
        type: String,
        required: [true, "Author Name is required"]
    }
});

const IssueModel = mongoose.model("Issue", IssueSchema);
export default IssueModel;