import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import NotaController from "../controllers/NotaController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const notasRoutes = express.Router();




notasRoutes.get("", NotaController.getNotas);
notasRoutes.get("/:id", NotaController.getNota);
notasRoutes.post("", NotaController.addNota);
notasRoutes.put("/:id", NotaController.editarNota);
notasRoutes.delete("/:id", NotaController.deletarNota);






export default notasRoutes