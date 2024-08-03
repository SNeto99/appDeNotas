import "dotenv/config";
import app from "./src/app.js"

const PORT = 3000;


app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Servidor Escutando na porta ${PORT}`);
});