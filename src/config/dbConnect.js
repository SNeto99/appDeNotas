import mysql from "mysql";
import { config } from "dotenv";

config(); // Esta linha assegura que as variáveis de ambiente sejam carregadas

const dadosBanco = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

let banco; 
let tentativas = 0;
const maximoTentativas = 10; 

function handleConnection() {
    banco = mysql.createConnection(dadosBanco);

    banco.connect(err => {
        if (err) {
            console.error("Erro ao conectar: " + err.message);
            tentativas++;
            if (tentativas <= maximoTentativas) {
                setTimeout(handleDisconnect, 2000); // Tentar reconectar após 2 segundos
            } else {
                console.error("Falha ao reconectar após " + maximoTentativas + " tentativas.");
            }
        } else {
            console.log("Conectado ao banco de dados MySQL!");
            tentativas = 0;
        }
    });

    banco.on('error', function (err) {
        console.log('Erro de banco de dados:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.error('A conexão foi interrompida.');
            if (tentativas <= maximoTentativas) {
                handleConnection();
            } else {
                console.error("Falha ao reconectar após " + maximoTentativas + " tentativas.");
            }
        } else {
            console.error('Erro no banco de dados:', err);
            throw err;
        }
    });
}

handleConnection();

export default banco;
