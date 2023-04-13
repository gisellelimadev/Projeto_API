const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_cupom';
const BASE_URL = '/cupom';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM tb_cupom WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(`${BASE_URL}`, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_cupom (cupom30)
        VALUES ('${corpo.cupom30}')
    `);

    corpo.id = sql.insertId;
    
    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.corpo;

    let jaExiste = await database.execute(`
        SELECT * FROM tb_cupom WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE tb_cupom SET
            cupom30='${req.body.id || jaExiste[0].cupom30}',
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM tb_cupom WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});

module.exports = app;