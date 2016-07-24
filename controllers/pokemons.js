var Pokemon = require('../models/PokemonSchema');

exports.getPokemons = function(req, res, err) {
    
    var location = [ req.params.longitude, req.params.latitude ];
    var distance = req.params.distance;
    Pokemon.find({ loc : { $near: {
     $geometry: {
        type: "Point" ,
        coordinates: location
     },
     $maxDistance: distance*1000 } } }, { '_id': 0, '__v': 0, 'deleteRequests': 0 }, function(error, pokemons) {
        
        if (error) {
            
            res.json({ message : error , success : false });
        } else if (pokemons !== null){
            
            res.json({ pokemons : pokemons, message: err, success : true });
        } else {
            
            res.json({ message : err , success : false });
        }
    });
};


exports.postPokemon = function(req, res, err) {
    
    var name = req.body.name;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    
    var pokemon = new Pokemon();
    pokemon.name = name;
    pokemon.loc = [ longitude, latitude ];
    pokemon.markerID = uid(9);
    pokemon.deleteRequests = 0;
    
    pokemon.save(function(err) {
        
        if (err) {
            
            res.json({ message : err, success : false });
        } else {
         
            res.json({ message : 'Added pokemon to DB', markerID : pokemon.markerID, success : true });   
        }       
    });
    
};


exports.deletePokemon = function(req, res, err) {
    
    var id = req.get('markerID');
    Pokemon.findOneAndUpdate({ markerID: id }, { $inc: { deleteRequests: 1 } }, function(err, pokemon){
        
        if (err) {
            
            res.json({ message : err, success : false });
        } else if (pokemon !== null) {
            
            if(pokemon.deleteRequests > 2) {
                
                pokemon.remove(function(err) {
            
                    if (err) {
                        res.json({ message : err, success : false });
                    } else {
                        
                        res.json({ message : 'Removed pokemon from DB', success : true });  
                    }
                });
            } else {
                
                    res.json({ message : 'Reported pokemon sighting', success : true });
            }
        } else {
         
            res.json({ message : 'markerID: '+id+' doesn\'t exist', success : true });
        }
        
    });
};


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
