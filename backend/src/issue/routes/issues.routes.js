import express from "express";

import {
    createIssue, createProject, deleteIssue, deleteProject, filterIssue, getAllIssue, getAllProject, getSpecificIssue, searchProject
} from "../controller/issues.controller.js"

const router = express.Router();

// GET routes
router.route("/getAllProject").get(getAllProject);
router.route("/getAllIssue").get(getAllIssue);
router.route("/getIssueById/:projectId/:issueId").get(getSpecificIssue);
router.route("/searchProject").get(searchProject);
router.route("/filterIssue/:projectId").get(filterIssue);

// POST routes
router.route("/createProject").post(createProject);
router.route("/createIssue").post(createIssue);

// DELETE routes
router.route("/deleteProject/:projectId").delete(deleteProject);
router.route("/deleteIssue/:projectId/:issueId").delete(deleteIssue);

export default router;
