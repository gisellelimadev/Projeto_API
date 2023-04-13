const express = require('express');
const categoryRoutes = require("./resources/category/routes");
const bannerRoutes = require('./resources/banner/routes');
const clientesRoutes = require('./resources/cliente/routes');
const cupomRoutes = require("./resources/cupom/routes")
const userRoutes = require("./resources/users/routes");
const swagger = require('swagger-ui-express');
const docs = require('./docs.json');

const cors = require('cors');

const app = express();

app.use(cors());

app.use('/documentacao',swagger.serve,swagger.setup(docs));

app.use(express.json()); //a comunicação toda vai ser feita em json, ta ligado!?
app.use(categoryRoutes);
app.use(bannerRoutes);
app.use(clientesRoutes);
app.use(cupomRoutes)
app.use(userRoutes)

app.listen(8000, () => {
    console.log('--------------');
    console.log('--- PRONTO ---')
    console.log('--------------');
});
