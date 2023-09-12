//IIFE Pokemon repository
let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', number: 1, height: 0.7, weight: 6.9, types: ['Grass', ' Poison']},
    {name: 'Charmander', number: 4, height: 0.6, weight: 8.5, types: 'Fire'},
    {name: 'Squirtle', number: 7, height: 0.5, weight: 9, types: 'Water'}  
  ];
  
  //function to add pokemon to repository with conditions
  function add(pokemon) {
    if(typeof pokemon === 'object' &&
    'name' in pokemon &&
    'number' in pokemon &&
    'height' in pokemon &&
    'weight' in pokemon &&
    'types' in pokemon) {
    pokemonList.push(pokemon);
  } else {
    console.log('Pokémon added to repository must contain name, number, height, weight, and type(s)');
  }}
  
  function getAll() {
    return pokemonList;
  }
  
  function showDetails(pokemon) {
    console.log(pokemon);
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