import express from "express";
import routes from "./src/routes/index.js";

const PORT = 3000;

const app = express();

app.use(express.json());

routes(app);

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Servidor Escutando na porta ${PORT}`);
});
