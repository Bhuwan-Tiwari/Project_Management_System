const prisma = require("../config/database.js");

const createProject = async (req, res) => {
  try {
    const { name, description, status, userId } = req.body;

    if (!name || !description || !userId) {
      return res
        .status(400)
        .json({ error: "Name, description, or userId are required." });
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        status,
        userId,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const listProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: true, // Include the user details for each project
        tasks: true, // Include tasks under each project
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const userId = req.user.id; // Assume userId is extracted from JWT in auth middleware

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    if (project.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this project." });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, description, status },
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assume userId is extracted from JWT in auth middleware

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    if (project.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this project." });
    }

    await prisma.project.delete({ where: { id } });
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createProject,
  listProjects,
  updateProject,
  deleteProject,
};
