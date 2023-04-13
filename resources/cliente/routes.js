const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_clientes';
const BASE_URL = '/clientes';

app.get(`${BASE_URL}`, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get("${BASE_URL/:id", async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM tb_clientes WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(`${BASE_URL}`, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_clientes 
        (nome, cpf, email, celular, endereco, bairro, cidade, cep)
        VALUES 
        ('${corpo.nome}','${corpo.cpf}','${corpo.email}','${corpo.celular}','${corpo.endereco}','${corpo.bairro}','${corpo.cidade}','${corpo.cep}');
    `);

    corpo.id = sql.insertId;
    
    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM tb_clientes WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE tb_clientes SET
            nome='${req.body.nome || jaExiste[0].nome}',
            cpf='${req.body.cpf || jaExiste[0].cpf}',
            email='${req.body.email || jaExiste[0].email}',
            celular='${req.body.celular || jaExiste[0].celular}',
            endereco='${req.body.endereco || jaExiste[0].endereco}',
            bairro='${req.body.bairro || jaExiste[0].bairro}',
            cidade='${req.body.cidade || jaExiste[0].cidade}',
            cep='${req.body.cep || jaExiste[0].cep}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM tb_clientes WHERE id='${req.params.id}'
    `);

    res.sendStatus(204);
});
module.exports = app;