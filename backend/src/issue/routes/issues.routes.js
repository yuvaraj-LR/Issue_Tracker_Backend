import express from "express";

import {
    createIssue, createProject, deleteIssue, deleteProject, filterIssue, getAllIssue, getAllProject, getSpecificProject, getSpecificIssue, searchProject
} from "../controller/issues.controller.js"

const router = express.Router();

// GET routes
router.route("/getAllProject").get(getAllProject);
router.route("/getAllIssue").get(getAllIssue);
router.route("/getProjectById").get(getSpecificProject);
router.route("/getIssueById").get(getSpecificIssue);

// POST routes
router.route("/createProject").post(createProject);
router.route("/createIssue").post(createIssue);
router.route("/searchProject").post(searchProject);
router.route("/filterIssueByLabel").post(filterIssue);

// DELETE routes
router.route("/deleteProject").delete(deleteProject);
router.route("/deleteIssue").delete(deleteIssue);

export default router;
