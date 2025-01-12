const { PrismaClient } = require("@prisma/client");
const prisma = require("../config/database.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils.js");

const createUser = async (req, res) => {
    try {
      const { name, email,password} = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name and email are required." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.User.create({
        data: {
          name,
          email,
          password: hashedPassword,
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

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid User." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  Login
};
