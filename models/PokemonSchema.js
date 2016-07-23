var mongoose = require('mongoose');

var PokemonSchema = mongoose.Schema({
    
    markerID : { type : String, unique : true },
    loc: { type: [Number], index: '2dsphere' },
    name : String
});


/*
PokemonSchema.pre('save', function(next) {
    
    var pokemon = this;
    model.findOne({ markerID : pokemon.markerID }, function(err, result) {
        
        if(err) {
            next(err);
        } else if (result !== null) {
            
            this.markerID = uid(9);
        }
    });
    next();
});
*/


function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = mongoose.model('Pokemon', PokemonSchema, 'pokemons');