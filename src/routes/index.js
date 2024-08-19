import express from "express";
import notasRoutes from "./notasRoutes.js";
import userRoutes from "./userRoutes.js";

import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const routes = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Hello World");
    });


    app.use("/appdenotas", express.json(), notasRoutes);
    app.use("/appdenotas", serveJsOnly, express.static(path.join(__dirname, "./../../views"))
    );

    app.use("/users", express.json(), userRoutes);


    
    app.get('*', (req, res) => {
        res.redirect('/');
    });
};

export default routes;





const serveJsOnly = (req, res, next) => {
    if (path.extname(req.path).toLowerCase() === ".js") {
        next();
    } else {
        res.status(403).send("Acesso negado");
    }
};