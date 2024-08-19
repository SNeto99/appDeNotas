import Nota from "../models/Nota.js";

class NotaController {
    static getNotas(req, res) {
        const idUser = req.query.idUser;

        Nota.getNotas(idUser)
            .then((results) => res.status(200).json(results))
            .catch((error) =>
                res
                    .status(500)
                    .json({ message: `Falha na requisição: ${error.message}` })
            );
    }

    static getNota(req, res) {
        const idNota = req.params.id;
        const idUser = req.query.idUser;

        Nota.getNota(idUser, idNota)
            .then((result) =>
                result
                    ? res.status(200).json(result)
                    : res.status(404).json({ message: "Nota não encontrada" })
            )
            .catch((error) =>
                res
                    .status(500)
                    .json({ message: `Falha na requisição: ${error.message}` })
            );
    }

    static addNota(req, res) {
        const { texto, idUser } = req.body;

        Nota.addNota(idUser, texto)
            .then((insertId) =>
                res.status(200).json({ status: "ok", id: insertId })
            )
            .catch((error) =>
                res
                    .status(500)
                    .json({ message: `Falha na requisição: ${error.message}` })
            );
    }

    static editarNota(req, res) {
        const idNota = req.params.id;
        const { texto, idUser } = req.body;

        Nota.editarNota(idUser, idNota, texto)
            .then((affectedRows) =>
                affectedRows
                    ? res.status(200).json({ status: "ok" })
                    : res.status(404).json({ message: "Nota não encontrada" })
            )
            .catch((error) =>
                res
                    .status(500)
                    .json({ message: `Falha na requisição: ${error.message}` })
            );
    }

    static deletarNota(req, res) {
        const idNota = req.params.id;
        const idUser = req.body.idUser;

        Nota.deletarNota(idUser, idNota)
            .then((affectedRows) =>
                affectedRows
                    ? res.status(200).json({ status: "ok" })
                    : res.status(404).json({ message: "Nota não encontrada" })
            )
            .catch((error) =>
                res
                    .status(500)
                    .json({ message: `Falha na requisição: ${error.message}` })
            );
    }
}

export default NotaController;
