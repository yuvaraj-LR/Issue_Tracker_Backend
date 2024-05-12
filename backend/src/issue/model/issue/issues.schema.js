import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const IssueSchema = new mongoose.Schema({
    projectId : {
        type: mongoose.Types.ObjectId
    },
    name : {
        type: String,
        required: [true, "Project Name is required"]
    },
    description: {
        type: String,
        required: [true, "Project Description is required"]
    },
    labels: [{
            type: String,
            required: true,
    }],
    author: {
        type: String,
        required: [true, "Author Name is required"]
    }
});

const IssueModel = mongoose.model("Issue", IssueSchema);
export default IssueModel;