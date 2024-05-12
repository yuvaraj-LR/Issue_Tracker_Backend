import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Project Name is required"]
    },
    description: {
        type: String,
        required: [true, "Project Description is required"]
    },
    author: {
        type: String,
        required: [true, "Author Name is required"]
    },
    issueId: [
        {
            type: mongoose.Types.ObjectId,
        }
    ]
})

const ProjectModel = mongoose.model("Project", ProjectSchema);
export default ProjectModel;