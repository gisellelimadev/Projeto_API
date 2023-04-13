let clientes = require("./resources");

function cadastrar(dados) {
    clientes.push(dados);
    return JSON.stringify(dados);
}

function buscar() {
    let lista = clientes.filter((cada) => {
        return cada.status < 3;
    })
    return JSON.stringify(lista);
}

function buscarUm(id) {
    let busca = clientes.filter((cada) => {
        return cada.id == id;
    })
    return JSON.stringify(busca);
}

function editar(id,corpo){
    clientes.forEach((cada) => {
        if(cada.id == id) {
            cada.nome = corpo.nome;
            cada.status = corpo.status;
        }
    })
}

function deletar(id){
    let novaLista = clientes.filter((cada) => {
        return cada.id != id;
    });
    clientes = novaLista;
}

module.exports = {
    buscar,
    buscarUm,
    cadastrar,
    editar,
    deletar,
};