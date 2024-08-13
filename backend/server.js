const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { loginUser, changePasswordOnFirstLogin, signUpUser } = require("./auth");
const { getStudents } = require("./services/dynamoService");
const { verifyToken } = require("./middleware/authMiddleware");
const { createStudentService } = require("./services/createStudentService");
const { deleteStudentService } = require("./services/deleteStudentService");
const { loginUserService } = require("./services/loginUserService");
const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const authResult = await loginUserService(username, password);
    res.json(authResult);
  } catch (error) {
    res.status(401).json({ error: error.message || "Login failed" });
  }
});

app.post("/api/change-password", async (req, res) => {
  const { username, email, password, newPassword } = req.body;

  try {
    const authResult = await changePasswordOnFirstLogin(
      username,
      email,
      password,
      newPassword
    );
    res.json(authResult);
  } catch (error) {
    res.status(401).json({ error: error.message || "Password change failed" });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const saveResult = await createStudentService(req, res);
    res.status(200).json(saveResult);
  } catch (error) {
    res.status(401).json({ error: error.message || "Add Student failed" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/user-details", async (req, res) => {
  try {
    const user = await verifyToken(req);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const saveResult = await deleteStudentService(req, res);
    res.status(200).json(saveResult);
  } catch (error) {
    res.status(401).json({ error: error.message || "Delete Student failed" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const result = await signUpUser(username, password, email);
    res.status(200).json({ message: "User signed up successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to sign up user" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
