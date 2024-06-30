class Nota{
    constructor(json){

        if(!json.id || !json.codigo || !json.nome) 
            throw new Error(`dados ausentes ao instanciar classe 'Nota'`)


        this.id              = json.id
        this.texto           = json.descricao ?? null
        this.dataCriacao     = json.dataCriacao ?? null
        this.dataAtualizacao = json.dataAtualizacao ?? null

    }
}

export default Nota