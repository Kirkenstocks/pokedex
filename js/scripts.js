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
  
  //function to create and display pokemon list, with click event
  function addListItem(pokemon) {
    let showPokemon = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listPokemon.appendChild(button);
    showPokemon.appendChild(listPokemon);
    button.addEventListener('click', () => {
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
      item.order = details.order;
      item.imageUrl = details.sprites.front_default;
      item.height = details.height / 10;
      item.weight = details.weight / 10;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  //creating the modal
  function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add(modal-close);
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal); 
    
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + item.height + ' m';

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + item.weight + ' kg';

    let imageElement = document.createElement('img')
    imageElement.src = item.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  //function to display details of pokemon selected in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal();
      //console.log(pokemon);
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

// //IIFE modal display
// let displayModal = (function() {
//   function showModal(title, text) {
//   let modalContainer = document.querySelector('#modal-container');
  
//   // Clear all existing modal content
//   // modalContainer.innerHTML = '';
  
//   let modal = document.createElement('div');
//   modal.classList.add('modal');
  
//   // Add the new modal content
//   let closeButtonElement = document.createElement('button');
//   closeButtonElement.classList.add('modal-close');
//   closeButtonElement.innerText = 'Close';
//   closeButtonElement.addEventListener('click', hideModal);
  
//   let titleElement = document.createElement('h1');
//   titleElement.innerText = title;

//   let contentElement = document.createElement('p');
//   contentElement.innerText = text;
  
//   modal.appendChild(closeButtonElement);
//   modal.appendChild(titleElement);
//   modal.appendChild(contentElement);
//   modalContainer.appendChild(modal);
  
//   modalContainer.classList.add('is-visible');

//   modalContainer.addEventListener('click', (e) => {
//     let target = e.target;
//     if (target === modalContainer) {
//       hideModal();
//     }
//   });

//   }

//   function hideModal() {
//     let modalContainer = document.querySelector('#modal-container');
//     modalContainer.classList.remove('is-visible');
//   }

//   window.addEventListener('keydown', (e) => {
//     let modalContainer = document.querySelector('#modal-container');
//     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//       hideModal();  
//     }
//   });

//   document.querySelector('#show-modal').addEventListener('click', () => {
//     showModal('Modal title', 'This is the modal content!');
//   });

//   // THE RETURN STATEMENT HERE
// })();