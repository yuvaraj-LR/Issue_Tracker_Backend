import { ErrorHandler } from "../../../utils/errorHandler.js";
import { createProjectRepo, findProjectRepo, updateProjectRepo, filterIssueRepo } from "../model/issues.repository.js";

export const createProject = async(req, res, next) => {
    try {
        const {name, description, author} = req.body;

        const project = {name, description, author};
        console.log(project, "projecttt.....");

        const newProject = await createProjectRepo(project);
        return res.status(200).json({status: true, msg: "New Project Added Successfully.", project: newProject});
    } catch (error) {
        console.log(error, "errorrrr");
        return next(new ErrorHandler(402, "Error in create project."))
    }
}   

export const createIssue = async(req, res, next) => {
    try {
        const { projectId } = req.query;
        const {name, description, labels, author} = req.body;

        const updateIssue = await updateProjectRepo(projectId, name, description, labels, author);
        console.log(updateIssue, "updateIssuee...");

        return res.status(200).json({status: true, msg: "New Issue Added Successfully."});
    } catch (error) {
        console.log(error, "error....");
        return next(new ErrorHandler(402, "Error in create issue."))
    }
}

export const getAllProject = async(req, res, next) => {
    try {
        const projects = await findProjectRepo({});
        console.log(projects, "projectt...");

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

    const project = await findProjectRepo({projectId});
    console.log(project[0]?.issues, "isssueessss");

    if(!project || project.length === 0) {
        return next(new ErrorHandler(404, "Incorrect ProjectId."));
    }

    return res.status(200).json({status: true, issue: project[0]?.issues});
}

export const getSpecificIssue = async(req, res, next) => {
    const {projectId, issueId} = req.query;

    const project = await findProjectRepo({projectId});
    console.log(project, "project");

    if(!project || project.length === 0) {
        return next(new ErrorHandler(404, "Incorrect IssueId."));
    }

    const issue = project[0].issues.find(issue => issue._id == issueId);
    return res.status(200).json({status: true, issue: issue})
}

export const searchProject = async(req, res, next) => {
    const {projectName} = req.body;
    const project = await findProjectRepo({"name": projectName});

    if(!project || project.length === 0) {
        return next(new ErrorHandler(404, "No project found!"));
    }

    return res.status(200).json({status: true, project: project})
}

export const filterIssue = async(req, res, next) => {
    try {
        const { projectId } = req.query;
        const { labels } = req.body;

        const project = await findProjectRepo({"_id": projectId});
        console.log(project, "project");

        if(!project || project.length === 0) {
            return next(new ErrorHandler(404, "Incorrect IssueId."));
        }

        const filteredIssues = project[0].issues.filter(issue => {
            return labels.every(label => issue.labels.includes(label));
        });

        if(!filteredIssues || filteredIssues.length == 0) {
            return next(new ErrorHandler(404, "No Result Found!"));
        }

        return res.status(200).json({status: true, issues: filteredIssues });
    } catch (error) {
        console.log(error, "error in filterissue...");
        return next(new ErrorHandler(404, "No project found!"));
    }
}

export const deleteProject = async(req, res, next) => {

}

export const deleteIssue = async(req, res, next) => {

}
