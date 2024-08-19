import express from "express";
import path from "path";
import UserController from "../controllers/userController.js";

// import { fileURLToPath } from "node:url";
// import { dirname } from "node:path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const userRoutes = express.Router();




// userRoutes.get("/getUsers", UserController.getUsers);
// userRoutes.get("/getUser/:id", UserController.getUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/newUser", UserController.newUser);
userRoutes.put("/editUsername/:id", UserController.editUsername);
userRoutes.delete("/deleteUser/:id", UserController.deleteUser);






export default userRoutes