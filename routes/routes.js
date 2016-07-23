var pokemonController = require('./controllers/pokemons.js');

module.exports = function(app) {
    
    app.get('/pokemons', pokemonController.getPokemons);
    app.post('/pokemon', pokemonController.postPokemons);
    app.delete('/pokemon', pokemonController.deletePokemon);
    
};