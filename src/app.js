import express from "express";
import routes from "./routes/index.js";

const app = express();


// Serve os arquivos estáticos apenas se acessados através de /123appdenotas
app.use("/appdenotas", express.static("views"));

// Middleware para interpretar JSON
app.use(express.json());

// Aplica as rotas definidas em ./routes/index.js
routes(app);


export default app;
