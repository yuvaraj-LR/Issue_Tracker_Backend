import mongoose from "mongoose";
import ProjectModel from "./project.schema.js";

export const createProjectRepo = async(project) => {
    return await new ProjectModel(project).save();
}

export const findProject = async(option) => {
    return await ProjectModel.findOne(option);
}

export const updateProjectRepo = async(projectId, issueId) => {
    return await ProjectModel.updateOne(
        {_id: projectId},
        {$push : {
            issueIdList: {
                issueId
            } 
        }}
    )
}