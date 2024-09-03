const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/verify-token", authMiddleware, authController.verifyToken);

module.exports = router;
