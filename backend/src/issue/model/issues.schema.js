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
    timestamp: {
        type: String,
    },
    issues: [
        {
            name : {
                type: String,
            },
            description: {
                type: String,
            },
            labels: [{
                type: String,
            }],
            author: {
                type: String,
            },
            timestamp: {
                type: String,
            }
        }
    ]
})

const ProjectModel = mongoose.model("Project", ProjectSchema);
export default ProjectModel;