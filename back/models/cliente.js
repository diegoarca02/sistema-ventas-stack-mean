var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: String,
    dni: String,
    correo: String,
    puntos: Number,
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cliente',ClienteSchema);