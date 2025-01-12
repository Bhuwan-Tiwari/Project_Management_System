const { PrismaClient } = require("@prisma/client");
const prisma = require("../config/database.js");

const createUser = async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
      }
  
      const newUser = await prisma.User.create({
        data: {
          name,
          email,
        },
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
  
  
      if (error.code === "P2002") {
        return res.status(409).json({
          error: "A user with this email already exists.",
          field: error.meta?.target || "email",
        });
      }
  
      return res.status(500).json({
        error: "Internal server error.",
        message: error.message || "Something went wrong.",
      });
    }
  };
  

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ error: "Name or email must be provided." });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return res.json(user);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found." });
    } else {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    return res.status(204).json({
        success:true,
        message:'sucessfully Deleted the user',
    }); 
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found." });
    } else {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
