const prisma = require("../config/database.js");


const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, assignedUserId } = req.body;

    
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }


    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assignedUserId, 
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};


const listTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

  
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    const tasks = await prisma.task.findMany({
      where: { projectId },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { userId } = req;


    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    
    if (task.assignedUserId !== userId) {
      return res.status(403).json({ error: "You are not authorized to update this task." });
    }


    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title || task.title,
        description: description || task.description,
        status: status || task.status,
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

   
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

 
    if (task.assignedUserId !== userId) {
      return res.status(403).json({ error: "You are not authorized to delete this task." });
    }

  
    await prisma.task.delete({
      where: { id },
    });

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { createTask, listTasks, updateTask, deleteTask };
