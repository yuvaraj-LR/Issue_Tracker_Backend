import mongoose from "mongoose";
import IssueModel from "./issues.schema.js";

export const createIssueRepo = async(project) => {
    return await new IssueModel(project).save();
}

export const findIssueRepo = async(option) => {
    console.log(option, "otpn");
    return await IssueModel.find(option);
}

