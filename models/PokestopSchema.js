var mongoose = require('mongoose');

var PokestopSchema = mongoose.Schema({
    
    markerID : { type : String, unique : true },
    latitude : Double,
    longitude : Double,
    name : String
});

module.exports = mongoose.model('Pokestop', PokemonSchema, 'pokestops');