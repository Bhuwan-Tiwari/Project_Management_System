const express = require("express")
const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router()

router.post('/user',userController.createUser); // Create user
router.get('/users', userController.getUsers);   // List users
router.put('/user/:id',userController.updateUser); // Update user
router.delete('/user/:id', userController.deleteUser); // Delete user
router.post('/login', userController.Login); // Delete user

router.post("/projects",authenticate,projectController.createProject);
router.get("/projects",authenticate,projectController.listProjects);
router.put("/projects/:id", authenticate,projectController.updateProject);
router.delete("/projects/:id", authenticate,projectController.deleteProject);

module.exports=router

