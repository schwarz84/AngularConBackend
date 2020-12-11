'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 1984;

// Agregado de victor
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/portafolio', {
    useNewUrlParser:true, 
    useUnifiedTopology: true
    }
).then(()=>{
           
    // Creacion del Servidor
    app.listen(port, () => {
        console.log('Servidor correindo de diez en URL: Localhost:1984');
    })
    
})
.catch(err => console.log(err));