import mongoose from "mongoose";
import IssueModel from "./issues.schema.js";

export const createIssueRepo = async(project) => {
    return await new IssueModel(project).save();
}