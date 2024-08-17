import banco from '../config/dbConnect.js';


class Nota{

    static getNotas(){

        banco.query("SELECT * FROM notas ORDER BY id DESC", (err, results, fields) => {
            if (err) {
                console.error("Erro ao consultar banco de dados:", err);
                throw err
            }
            
            return results;
        });


    }







}

export default Nota