import { ErrorHandler } from "../../../utils/errorHandler.js";
import { createProjectRepo, findProjectRepo, updateProjectRepo, deleteProjectRepo } from "../model/issues.repository.js";

export const createProject = async(req, res, next) => {
    try {
        const {name, description, author} = req.body;

        const timestamp = new Date().toDateString();
        console.log(timestamp, "stampp...");

        const project = {name, description, author, timestamp};
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
        const { name, description, labels, author} = req.body;

        const timestamp = new Date().toDateString();

        const updateIssue = await updateProjectRepo(projectId, name, description, labels, author, timestamp);
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
    try {
        const {projectId} = req.query;
        const deletedProject = await deleteProjectRepo(projectId);

        if(!deletedProject?.acknowledged) {
            return next(new ErrorHandler(404, "No project found to delete.!"));
        }
        
        return res.status(200).json({status: true, msg: "Project Deleted Successfully."})
    } catch (error) {
        console.log(error, "error in deleteProject...");
        return next(new ErrorHandler(404, "Error in delete project."))
    }
}

export const deleteIssue = async(req, res, next) => {
    try {
        const {projectId, issueId} = req.query;

        const project = await findProjectRepo({"_id": projectId});
        console.log(project, "project");

        if(!project || project.length === 0) {
            return next(new ErrorHandler(404, "Incorrect ProjectId."));
        }

        const issueIndex = project[0].issues.findIndex(issue => issue._id == issueId);
        console.log(issueIndex, "indexx...");

        if(issueIndex == -1) {
            return next(new ErrorHandler(404, "Incorrect IssueId."))
        }

        project[0].issues.splice(issueIndex, 1);
        await project[0].save();

        return res.status(200).json({status: true, msg: "Issue Deleted Successfully."})
    } catch (error) {
        console.log(error, "error in deleteIsssuee....");
        return next(new ErrorHandler(404, "Error in delete issue."))
    }
}

