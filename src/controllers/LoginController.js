import banco from "../config/dbConnect.js";

class NotaController {
    static getNotas(req, res) {
        banco.query(
            "SELECT * FROM notas ORDER BY id DESC",
            (err, results, fields) => {
                if (err) {
                    console.error("Erro ao consultar banco de dados:", err);
                    return res
                        .status(500)
                        .json({
                            message: `Falha na requisição: ${err.message}`,
                        });
                }
                res.status(200).json(results);
            }
        );
    }

    static getNota(req, res) {
        const idNota = req.params.id;
        if (!idNota) {
            return res.status(400).json({ message: "ID não encontrado" });
        }
        banco.query(
            "SELECT * FROM notas WHERE id = ?",
            [idNota],
            (err, results, fields) => {
                if (err) {
                    console.error("Erro ao consultar banco de dados:", err);
                    return res
                        .status(500)
                        .json({
                            message: `Falha na requisição: ${err.message}`,
                        });
                }
                res.status(200).json(results[0]);
            }
        );
    }

    static addNota(req, res) {
        const { texto } = req.body;
        if (!texto) {
            return res.status(400).json({ message: "Texto é necessário" });
        }
        banco.query(
            "INSERT INTO notas (texto) VALUES (?)",
            [texto],
            (err, results, fields) => {
                if (err) {
                    console.error("Erro ao inserir dados:", err);
                    return res.status(500).json({
                        message: `Falha na requisição: ${err.message}`,
                    });
                }
                res.status(200).json({ status: "ok", id: results.insertId });
            }
        );
    }

    static editarNota(req, res) {
        const idNota = req.params.id;
        const { texto } = req.body;
        if (!idNota || !texto) {
            return res
                .status(400)
                .json({ message: "ID e texto são necessários" });
        }
        banco.query(
            "UPDATE notas SET texto = ? WHERE id = ?",
            [texto, idNota],
            (err, results, fields) => {
                if (err) {
                    console.error("Erro ao atualizar dados:", err);
                    return res.status(500).json({
                        message: `Falha na requisição: ${err.message}`,
                    });
                }
                res.status(200).json({ status: "ok" });
            }
        );
    }

    static deletarNota(req, res) {
        const idNota = req.params.id;
        if (!idNota) {
            return res.status(400).json({ message: "ID é necessário" });
        }
        banco.query(
            "DELETE FROM notas WHERE id = ?",
            [idNota],
            (err, results, fields) => {
                if (err) {
                    console.error("Erro ao deletar dados:", err);
                    return res.status(500).json({
                        message: `Falha na requisição: ${err.message}`,
                    });
                }
                res.status(200).json({ status: "ok" });
            }
        );
    }
}

export default NotaController;
