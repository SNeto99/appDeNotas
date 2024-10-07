import banco from "../config/dbConnect.js";

class User {
    static getUsers() {
        return new Promise((resolve, reject) => {
            banco.query(
                "SELECT * FROM users ORDER BY id DESC",
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

    static getUser(id) {
        return new Promise((resolve, reject) => {
            banco.query(
                "SELECT * FROM users WHERE id = ?",
                [id],
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

    static getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            banco.query(
                "SELECT * FROM users WHERE username like ?",
                [username],
                (err, results, fields) => {
                    if (err) {
                        console.error("Erro ao consultar banco de dados:", err);
                        reject(err);
                    }

                    resolve(results.length ? results : null);
                }
            );
        });
    }

    static newUser(username, email, password) {
        return new Promise((resolve, reject) => {
            User.getUserByUsername(username)
                .then((result) => {
                    if (result !== null) {
                        return reject({
                            error: true,
                            message: "Nome de Usuário já em uso.",
                        });
                    }

                    banco.query(
                        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                        [username, email, password],
                        (err, results, fields) => {
                            if (err) {
                                console.error("Erro ao inserir dados:", err);
                                return reject(err);
                            }
                            resolve(results.insertId);
                        }
                    );
                })
                .catch((err) => {
                    console.error("Erro ao buscar usuário:", err);
                    reject(err);
                });
        });
    }

    static login(login, password) {
        return new Promise((resolve, reject) => {
            try {
                banco.query(
                    "SELECT * FROM users WHERE (username like ? OR email like ?) AND password like ?",
                    [login, login, password],
                    (err, results, fields) => {
                        if (err) {
                            console.error("Erro ao inserir dados:", err);
                            reject(err);
                            return;
                        }

                        if (results.length == 0) {
                            var response = {
                                isValid: false,
                            };
                        } else {
                            var response = {
                                isValid: true,
                                idUser: results[0].id,
                            };
                        }

                        resolve(response);
                    }
                );
            } catch (error) {
                throw "Erro ao realizar consulta: " + error;
            }
        });
    }

    static editUsername(id, texto) {
        return new Promise((resolve, reject) => {
            banco.query(
                "UPDATE users SET username = ? WHERE id = ?",
                [texto, id],
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

    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            banco.query(
                "DELETE FROM users WHERE id = ?",
                [id],
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

export default User;
