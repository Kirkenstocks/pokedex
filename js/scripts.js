//IIFE Pokemon repository
let pokemonRepository = (function () {
  let pokemonList = [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  //function to add pokemon to repository with conditions
  function add(pokemon) {
    if(typeof pokemon === 'object' && 'name' in pokemon) {
    pokemonList.push(pokemon);
  } else {
    console.log('Invalid Pokémon entry');
  }}
  
  function getAll() {
    return pokemonList;
  }
  
  //function to display details of pokemon selected
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

//function to create and display pokemon list, with click event
  function addListItem(pokemon) {
    let showPokemonDetails = function() {showDetails(pokemon)};
    let showPokemon = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = `${pokemon.number}. ${pokemon.name}`;
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