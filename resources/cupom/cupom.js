let clientes = require("./model");

function cadastrar(dados) {
    tb_cupom.push(dados);
    return JSON.stringify(dados);
}

function buscar() {
    let lista = tb_cupom.filter((cada) => {
        return cada.status < 3;
    })
    return JSON.stringify(lista);
}

function buscarUm(id) {
    let busca = tb_cupom.filter((cada) => {
        return cada.id == id;
    })
    return JSON.stringify(busca);
}

function editar(id,corpo){
    tb_cupom.forEach((cada) => {
        if(cada.id == id) {
            cada.nome = corpo.nome;
            cada.status = corpo.status;
        }
    })
}

function deletar(id){
    let novaLista = tb_cupom.filter((cada) => {
        return cada.id != id;
    });
    tb_cupom = novaLista;
}

module.exports = {
    buscar,
    buscarUm,
    cadastrar,
    editar,
    deletar,
};