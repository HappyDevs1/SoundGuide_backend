const User = require("../models/userModel");
const { Types } = require("mongoose");
const path = require("path");

async function createUser(req, res) {
  const { name, surname } = req.body;
  
  try {

    if (!name || !surname) {
      return res.status(406).json({ message: "All fields are required" });
    }

    // const existingUser = await User.findOne();

    // if (existingUser) {
    //   return res.status(409).json({ message: "User already exists" });
    // }

    const newUser = new User({ name });

    await newUser.save();

    // const token = jwt.sign({ id: newUser._id }, JWT_SECRET , { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    console.log(error);
    res.status(500).json({ error: "Server error, failed to create a new user" });
  }
}

async function getUsers(req, res) {
  try {
    const foundUsers = await User.find();

    res.status(200).json({ message: "Users found", users: foundUsers });
  } catch (error) {
    console.log(error);
  }
}

async function findUser(req, res) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid user ID format" });
    return;
  }
  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user: foundUser });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetch user" });
  }
}

async function editUser(req, res) {
  const { id } = req.params;
  const { name, surname } = req.body;

  try {
    const editedUser = await User.findByIdAndUpdate(id, { name, surname });

    if (!editedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: editedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to edit user" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to edit user" });
  }
};