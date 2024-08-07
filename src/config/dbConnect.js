import mysql from "mysql";
import { config } from "dotenv";

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

const dadosBanco = {
    host: host,
    user: user,
    password: password,
    database: database,
};

const banco  = mysql.createConnection(dadosBanco);

// Conectar ao banco de dados
banco.connect((err) => {
    if (err) {
        return console.error("Erro ao conectar: " + err.message);
    }
    console.log("Conectado ao banco de dados MySQL!");
});


export default banco;