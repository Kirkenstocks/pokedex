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

  //function to fetch pokemon list from API
  function loadList(){
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
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
      item.name = details.species.name;
      item.number = details.id;
      item.imageUrl = details.sprites.front_default;
      item.height = details.height / 10;
      item.weight = details.weight / 10;
      item.types = details.types.map(function (type) {
        return type.type.name;
      });
    }).catch(function(e) {
      console.error(e);
    });
  }
  
  //function to create and display pokemon list, with click event
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    pokemonItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button', 'btn', 'btn-primary', 'btn-lg');
    button.setAttribute('data-target' , '#exampleModal')
    button.setAttribute('data-toggle', 'modal');
    pokemonItem.appendChild(button);
    pokemonList.appendChild(pokemonItem);
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }
  
  //displaying each pokemon's info in the modal
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let nameCapital = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let nameElement = $('<h3 class="modal-title">' + nameCapital + '</h3>');
    let imageElement = $('<img class="image-element"><br>');
    imageElement.attr('src', pokemon.imageUrl);
    let numberElement = $('<p>' + 'Pokédex ID Number: ' + pokemon.number + '</p>');
    let heightElement = $('<span>' + 'Height: ' + pokemon.height + ' m / ' + '</span>');
    let weightElement = $('<span>' + 'Weight: ' + pokemon.weight + ' kg' + '</span>');
    let typeElement = $('<p class = "type-element">' + pokemon.types.join(" / ") + '</p>');
    
    
  }

  //function to display details of pokemon selected in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
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