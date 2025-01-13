const express = require("express");
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController.js");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/user", userController.createUser);
router.get("/users", userController.getUsers);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/login", userController.Login);

router.post("/projects", authenticate, projectController.createProject);
router.get("/projects", authenticate, projectController.listProjects);
router.put("/projects/:id", authenticate, projectController.updateProject);
router.delete("/projects/:id", authenticate, projectController.deleteProject);

router.post("/:projectId/tasks", authenticate, taskController.createTask);
router.get("/:projectId/tasks", authenticate, taskController.listTasks);
router.put("/tasks/:id", authenticate, taskController.updateTask);
router.delete("/tasks/:id", authenticate, taskController.deleteTask);

module.exports = router;
