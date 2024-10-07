import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const appRoutes = express.Router();



appRoutes.get("/app", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/app.html"));
});
appRoutes.get("/login", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/login.html"));
});

appRoutes.get("/cadastro", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/cadastro.html"));
});

appRoutes.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/index.html"));
});



export default appRoutes