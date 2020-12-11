'use strick'

var express   = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar Archivos de Rutas

var projectRoutes = require('./routes/projectRoutes');

// Middelwares: Es una capa o metodo que se ejecuta antes de la accion de un controlador

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
// hago un muddelware
app.use('/app', projectRoutes);

// Exportar 
module.exports = app;
