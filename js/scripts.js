//IIFE Pokemon repository
let pokemonRepository = (function () {
  let pokemonList = [];
  
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  //fetch pokemon list from API
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
  
  //fetch pokemon details from API
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
      alert('Unable to load Pokémon data.');
    });
  }
  
  //create and display pokemon list, with click event
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    pokemonItem.classList.add('list-group-item', 'col-md-4', 'col-sm-6', 'd-inline-flex', 'justify-content-center');
    
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button', 'btn', 'btn-outline-primary', 'btn-lg', 'col-10', 'pokemon-button');
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
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    let nameCapital = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let nameElement = document.createElement('h3');
    nameElement.innerText = nameCapital;
    nameElement.classList.add('modal-title');

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', pokemon.imageUrl);
    imageElement.setAttribute('alt', 'A small frontal image of' + nameCapital);

    let numberElement = document.createElement('p');
    numberElement.innerText = 'Pokédex ID number: ' + pokemon.number;

    let heightElement = document.createElement('span');
    heightElement.innerText = 'Height: ' + pokemon.height + ' m / ';

    let weightElement = document.createElement('span');
    weightElement.innerText = 'Weight: ' + pokemon.weight + ' kg';

    let typeElement = document.createElement('p');
    typeElement.innerText = 'Type(s): ' + pokemon.types.join(' / ');
    
    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(numberElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typeElement);
    
  }

  //displaying details of pokemon selected in a modal
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

//loading pokemon list to sceen initially
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});