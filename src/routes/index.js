import express from "express";
import notasRoutes from "./notasRoutes.js";
import userRoutes from "./userRoutes.js";
import appRoutes from "./appRoutes.js";

import path from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const routes = (app) => {
    app.get("/hello", (req, res) => {
        res.status(200).send("Hello World");
    });


    app.use("/users", express.json(), userRoutes);
    app.use("/notas", express.json(), notasRoutes);

    
    app.use("/", express.json(), appRoutes);
    app.use("/", serveJsOnly, express.static(path.join(__dirname, "./../../views")));
    

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