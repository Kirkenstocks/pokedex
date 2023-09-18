//IIFE Pokemon repository
let pokemonRepository = (function () {
  let pokemonList = [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  //function to add pokemon to repository with conditions
  function add(pokemon) {
    if(typeof pokemon === 'object' && 'name' in pokemon) {
    pokemonList.push(pokemon);
  } else {
    console.log('Pokémon input is not correct');
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
    let showPokemon = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listPokemon.appendChild(button);
    showPokemon.appendChild(listPokemon);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  //function to fetch pokemon list from API
  function loadList(){
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  //function to fetch pokemon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
}) ();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});