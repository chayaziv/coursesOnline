const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (db) => {
  const router = express.Router();
  const userModel = User(db); // יצירת המודל עם db

  // Register
  router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      userModel.create(name, email, hashedPassword, role, (err, userId) => {
        if (err) {
          return res.status(500).json({ message: "Error registering user" });
        }
        const token = jwt.sign({ userId: userId, role: role }, "secret", {
          expiresIn: "1h",
        });
        res
          .status(200)
          .json({
            token,
            userId,
            role,
            message: "User registered successfully",
          });
      });
    } catch (err) {
      res.status(500).json({ message: "Error registering user" });
    }
  });

  // Login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      userModel.findByEmail(email, async (err, user) => {
        if (err || !user) {
          return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, "secret", {
          expiresIn: "1h",
        });
        res
          .status(200)
          .json({
            token,
            userId: user.id,
            role: user.role,
            message: "Logged in successfully",
          });
      });
    } catch (err) {
      res.status(500).json({ message: "Error logging in" });
    }
  });

  return router;
};
