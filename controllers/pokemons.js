var Pokemon = require('./models/PokemonSchema');

exports.getPokemons = function(req, res, err) {
    
    var location = [ req.body.latitude, req.body.longitude ];
    var distance = 2/6371;
    Pokemon.find({ loc : { $near : location, $maxDistance : distance }}, { '_id': 0 }, function(err, pokemons) {
        
        if (err) {
            
            res.json({ message : err , success : false });
        } else {
            
            res.json({ pokemons : pokemons, success : true });
        }
    });
};


exports.postPokemon = function(req, res, err) {
    
    var name = req.body.name;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    
    var pokemon = new Pokemon();
    pokemon.name = name;
    pokemon.loc = [ latitude, longitude ];
    pokemon.markerID = uid(9);
    
    pokemon.save(function(err) {
        
        if (err) {
            
            res.json({ message : err, success : false });
        } else {
         
            res.json({ message : 'Added pokemon to DB', success : true });   
        }       
    });
    
};


exports.deletePokemon = function(req, res, err) {
    
    var id = req.body.markerID;
    Pokemon.remove({ markerID : id }, function(err) {
        
        if (err) {
            res.json({ message : err, success : false });
        } else {
            
            res.json({ message : 'Removed pokemon from DB', success : true });  
        }
    });
};


PokemonSchema.pre('save', function(next) {
    
    var pokemon = this;
    this.findOne({ markerID : pokemon.markerID }, function(err, result) {
        
        if(err) {
            next(err);
        } else if (result !== null) {
            
            this.markerID = uid(9);
        }
    });
    next();
});


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
