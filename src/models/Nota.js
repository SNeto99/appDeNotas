import banco from "../config/dbConnect.js";

class Nota {
    static getNotas(idUser) {
        return new Promise((resolve, reject) => {
            banco.query(
                "SELECT * FROM notas WHERE idUser = ? ORDER BY id DESC",
                [idUser],
                (err, results, fields) => {
                    if (err) {
                        console.error("Erro ao consultar banco de dados:", err);
                        reject(err);
                    }
                    resolve(results);
                }
            );
        });
    }

    static getNota(idUser, id) {
        return new Promise((resolve, reject) => {
            banco.query(
                "SELECT * FROM notas WHERE id = ? AND idUser = ?",
                [id, idUser],
                (err, results, fields) => {
                    if (err) {
                        console.error("Erro ao consultar banco de dados:", err);
                        reject(err);
                    }
                    resolve(results.length ? results[0] : null);
                }
            );
        });
    }

    static addNota(idUser, texto) {
        return new Promise((resolve, reject) => {
            banco.query(
                "INSERT INTO notas (texto, idUser) VALUES (?, ?)",
                [texto, idUser],
                (err, results, fields) => {
                    if (err) {
                        console.error("Erro ao inserir dados:", err);
                        reject(err);
                    }
                    console.log(results.insertId);
                    resolve('12');
                }
            );
        });
    }

    static editarNota(idUser, id, texto) {
        return new Promise((resolve, reject) => {
            banco.query(
                "UPDATE notas SET texto = ? WHERE id = ? AND idUser = ?",
                [texto, id, idUser],
                (err, results, fields) => {
                    if (err) {
                        console.error("Erro ao atualizar dados:", err);
                        reject(err);
                    }
                    resolve(results.affectedRows);
                }
            );
        });
    }

    static deletarNota(idUser, id) {
        return new Promise((resolve, reject) => {
            banco.query(
                "DELETE FROM notas WHERE id = ? AND idUser = ?",
                [id, idUser],
                (err, results, fields) => {
                    if (err) {
                        console.error("Erro ao deletar dados:", err);
                        reject(err);
                    }
                    resolve(results.affectedRows);
                }
            );
        });
    }
}

export default Nota;
