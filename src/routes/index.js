import express from "express";
import notas from "./notasRoutes.js";
import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Hello World");
    });

    app.route("/appdenotas/login").get((req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../../views/login.html"));
    });

    app.route("/appdenotas/cadastro").get((req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../../views/cadastro.html"));
    });

    app.route("/appdenotas").get((req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../../views/index.html"));
    });

    app.use("/appdenotas/", express.json(), notas);

    app.get('*', (req, res) => {
        res.redirect('/');
    });
};

export default routes;
