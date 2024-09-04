import express from "express";
import routes from "./src/routes/index.js";
import "dotenv/config";


const PORT = process.env.PORT;

const app = express();

app.use(express.json());

routes(app);

app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Servidor Escutando na porta ${PORT}`);
});
