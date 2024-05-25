import { ErrorHandler } from "../../../utils/errorHandler.js";
import { createProjectRepo, findProjectRepo, updateProjectRepo, deleteProjectRepo } from "../model/issues.repository.js";

export const createProject = async(req, res, next) => {
    try {
        const {name, description, author} = req.body;

        const now = new Date();

        // Format the date to "May 20 2024"
        const timestamp = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(now);
        console.log(timestamp, "formattedDate...");

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

        if(!projects || projects.length === 0) {
            return next(new ErrorHandler(404, "There are currently no projects available. Please add a project to begin adding issues."));
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

export const getSpecificProject = async(req, res, next) => {
    const {projectId} = req.query;

    const project = await findProjectRepo({"_id":projectId});
    console.log(project, "projectttt....");

    if(!project || project.length === 0) {
        return next(new ErrorHandler(404, "Incorrect IssueId."));
    }

    return res.status(200).json({status: true, project: project})
}

export const searchProject = async(req, res, next) => {
    const {projectName, authorName} = req.body;

    const project = await findProjectRepo({"name": projectName});
    const author = await findProjectRepo({"author": authorName});
    console.log(project, "project....");
    console.log(author, "author...");

    if (project && project.length > 0) {
        return res.status(200).json({status: true, project });
    } else if (author  && author.length > 0) {
        console.log("I am returning the author data...");
        return res.status(200).json({status: true, "project": author });
    } else {
        return next(new ErrorHandler(404, "No project found!"));
    }
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
        console.log(projectId, "idddd.....");

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

