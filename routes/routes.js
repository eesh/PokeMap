var pokemonController = require('../controllers/pokemons.js');

module.exports = function(app) {
    
    app.get('/pokemons/:longitude/:latitude/:distance', pokemonController.getPokemons);
    app.post('/pokemon', pokemonController.postPokemon);
    app.delete('/pokemon', pokemonController.deletePokemon);
    
};