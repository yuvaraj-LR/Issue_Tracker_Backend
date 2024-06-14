import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

// Configure the .env files.
dotenv.config({ path: ".env" });

import {
    errorHandlerMiddleware,
    handleUncaughtError
} from "./middleware/errorHandlerMiddleware.js";

import issueRoutes from "./src/issue/routes/issues.routes.js";
import userRoutes from "./src/user/routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// User Login routes.
app.use("/api/user", userRoutes);

// Configuring routes.
app.use("/api/issueTracker", issueRoutes);



// Default path.
app.get("/", (req, res) => {
    res.status(200).send("Welcome to our login server.");
})

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

// 404 API handler
app.use((req, res) => {
    res.status(503).send(handleUncaughtError);
});

export default app;