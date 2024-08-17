import mysql from "mysql";
import "dotenv/config";

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

const dadosBanco = {
    host: host,
    user: user,
    password: password,
    database: database,
    
    connectionLimit: 10,
};

    const banco = mysql.createPool(dadosBanco);
    
    banco.on("connection", function (connection) {
        console.log("Conectado ao banco de dados MySQL!");
    });

    banco.on("error", function (err) {
        console.error("Erro ao conectar: " + err.message);
        return;
    });

    
    
    export default banco;