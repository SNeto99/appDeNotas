import express from "express";
import NotaController from "../controllers/NotaController.js";


const notasRoutes = express.Router();


notasRoutes.get("", NotaController.getNotas);
notasRoutes.get("/:id", NotaController.getNota);
notasRoutes.post("", NotaController.addNota);
notasRoutes.put("/:id", NotaController.editarNota);
notasRoutes.delete("/:id", NotaController.deletarNota);




export default notasRoutes