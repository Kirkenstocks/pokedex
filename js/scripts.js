//IIFE Pokemon repository
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
  
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let showPokemonDetails = function() {showDetails(pokemon)};
    let showPokemon = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    button.addEventListener('click', showPokemonDetails);
    listPokemon.appendChild(button);
    showPokemon.appendChild(listPokemon);
  }

  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem
  };
}) ();

//loop function to display pokemon from repository
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})