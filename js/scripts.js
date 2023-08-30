//IIFE Pokemon repository with add & getAll functions
let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', number: 1, height: 0.7, weight: 6.9, types: ['Grass', ' Poison']},
    {name: 'Charmander', number: 4, height: 0.6, weight: 8.5, types: 'Fire'},
    {name: 'Squirtle', number: 7, height: 0.5, weight: 9, types: 'Water'}  
  ];
  
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  
  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
    getAll: getAll
  };
}) ();

let pokemonLoopList = pokemonRepository.getAll();

//forEach loop to display pokemon and their properties
function displayPokemon(pokemon) {
  document.write("<p>" + pokemon.number + '. ' + pokemon.name + ' (height: ' + pokemon.height + ' m, weight: ' + pokemon.weight + ' kg) -- type(s): ' + pokemon.types);
}
//calling loop function
pokemonLoopList.forEach(displayPokemon);