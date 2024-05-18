import mongoose from "mongoose";
import IssueModel from "./issues.schema.js";

export const createProjectRepo = async(project) => {
    return await new IssueModel(project).save();
}

export const findProjectRepo = async(option) => {
    return await IssueModel.find(option);
}

export const updateProjectRepo = async(projectId, name, description, labels, author, timestamp) => {
    return await IssueModel.updateOne(
        {_id: projectId},
        {$push : {
            issues: {
                name: name,
                description: description,
                labels: labels,
                author: author,
                timestamp: timestamp
            }
        }}
    )
}

export const deleteProjectRepo = async (projectId) => {
    return await IssueModel.deleteOne({"_id": projectId});
}
