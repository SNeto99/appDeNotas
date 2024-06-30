import express from "express";
import notas from "./notasRoutes.js";
import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = (app) => {
    app.route("/123appdenotas").get((req, res) => {
        res.status(200).sendFile(
            path.join(__dirname, "../../views/index.html")
        );
    });
    
    app.use(express.json(), notas);
};

export default routes;
