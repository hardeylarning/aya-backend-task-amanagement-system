import express from "express";
import {
  deleteTaskController,
  patchTaskController,
  getTaskController,
  getUserTasksController,
  newTaskController,
  tasksController,
  updateTaskController,
  getUserTasksNotCompletedController,
} from "../controller/task-controller.js";
import { isLoggedIn } from "../middleware/is-logged-in.js";

const taskRoute = express.Router();

taskRoute.post("/add", isLoggedIn, newTaskController);

taskRoute.patch("/:id", isLoggedIn, patchTaskController);

taskRoute.get("/", isLoggedIn, tasksController);

taskRoute.get("/:id", isLoggedIn, getTaskController);

taskRoute.put("/:id", isLoggedIn, updateTaskController);

taskRoute.get("/user-tasks/not-completed", isLoggedIn, getUserTasksNotCompletedController);
 
taskRoute.get("/user-tasks/all", isLoggedIn, getUserTasksController);

taskRoute.delete("/:id", isLoggedIn, deleteTaskController);

export default taskRoute;
