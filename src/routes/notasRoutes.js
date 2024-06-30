import express from "express";
import NotaController from "../controllers/NotaController.js";

const notas = express.Router();

notas.get("/notas", NotaController.getNotas);
notas.get("/notas/:id", NotaController.getNota);
notas.post("/notas", NotaController.addNota);
notas.put("/notas/:id", NotaController.editarNota);
notas.delete("/notas/:id", NotaController.deletarNota);



export default notas