import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import NotaController from "../controllers/NotaController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const notasRoutes = express.Router();


notasRoutes.get("/app", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/app.html"));
});

notasRoutes.get("/notas", NotaController.getNotas);
notasRoutes.get("/notas/:id", NotaController.getNota);
notasRoutes.post("/notas", NotaController.addNota);
notasRoutes.put("/notas/:id", NotaController.editarNota);
notasRoutes.delete("/notas/:id", NotaController.deletarNota);


notasRoutes.get("/login", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/login.html"));
});

notasRoutes.get("/cadastro", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/cadastro.html"));
});

notasRoutes.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../../views/index.html"));
});



export default notasRoutes