import { ErrorHandler } from "../../../utils/errorHandler.js";
import { createIssueRepo, findIssueRepo } from "../model/issue/issues.repository.js";
import { createProjectRepo, findProjectRepo, updateProjectRepo } from "../model/project/project.repository.js";

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

        await updateProjectRepo(projectId, newIssue._id);

        return res.status(200).json({status: true, project: newIssue});
    } catch (error) {
        console.log(error, "error....");
        return next(new ErrorHandler(402, "Error in create issue."))
    }
}

export const getAllProject = async(req, res, next) => {
    try {
        const projects = await findProjectRepo();
        console.log(projects);

        if(!projects || projects.length === 0) {
            return next(new ErrorHandler(404, "No project available."));
        }

        return res.status(200).json({status: true, project: projects});
    } catch (error) {
        console.log(error, "error....");
        return next(new ErrorHandler(402, "Error in getAllProject."));
    }
}

export const getAllIssue = async(req, res, next) => {
    const {projectId} = req.query;

    const issues = await findIssueRepo({projectId});
    console.log(issues, "isssueessss");

    if(!issues || issues.length === 0) {
        return next(new ErrorHandler(404, "Incorrect ProjectId."));
    }

    return res.status(200).json({status: true, issue: issues});
}

export const getSpecificIssue = async(req, res, next) => {
    const {issueId} = req.query;
    console.log(issueId);

    const issue = await findIssueRepo({"_id": issueId});

    if(!issue || issue.length === 0) {
        return next(new ErrorHandler(404, "Incorrect IssueId."));
    }

    return res.status(200).json({status: true, issue: issue})
}

export const searchProject = async(req, res, next) => {
    const {projectName} = req.body;

    const project = await findIssueRepo({"name": projectName});

    if(!project || project.length === 0) {
        return next(new ErrorHandler(404, "No project found!"));
    }

    return res.status(200).json({status: true, project: project})
}

export const filterIssue = async(req, res, next) => {
    
}

export const deleteProject = async(req, res, next) => {

}

export const deleteIssue = async(req, res, next) => {

}

