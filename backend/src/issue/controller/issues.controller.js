import { ErrorHandler } from "../../../utils/errorHandler.js";
import { createIssueRepo } from "../model/issue/issues.repository.js";
import { createProjectRepo, updateProjectRepo } from "../model/project/project.repository.js";

export const createProject = async(req, res, next) => {
    try {
        console.log("I am calledd...");
        const {name, description, author} = req.body;

        const project = {name, description, author};
        console.log(project, "projecttt.....");

        const newProject = await createProjectRepo(project);
        return res.status(200).json({status: true, project: newProject});
    } catch (error) {
        console.log(error, "errorrrr");
        return next(new ErrorHandler(402, "Error in create project."))
    }
}   

export const createIssue = async(req, res, next) => {
    try {
        const { projectId } = req.query;
        const {name, description, labels, author} = req.body;

        const issue = {projectId, name, description, labels, author};

        const newIssue = await createIssueRepo(issue);
        console.log(newIssue, "Issueee....");

        const addIssueToProject = await updateProjectRepo(projectId, newIssue._id);
        console.log(addIssueToProject, "addedddd");

        return res.status(200).json({status: true, project: newIssue});
    } catch (error) {
        console.log(error, "error....");
        return next(new ErrorHandler(402, "Error in create issue."))
    }
}

export const getAllProject = async(req, res, next) => {

}

export const getAllIssue = async(req, res, next) => {

}

export const getSpecificIssue = async(req, res, next) => {

}

export const searchProject = async(req, res, next) => {

}

export const filterIssue = async(req, res, next) => {

}

export const deleteProject = async(req, res, next) => {

}

export const deleteIssue = async(req, res, next) => {

}

