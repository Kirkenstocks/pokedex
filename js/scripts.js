let pokemonList = [
  {name: 'Bulbasaur', number: 1, height: 0.7, weight: 6.9, types: ['grass', 'poison']},
  {name: 'Charmander', number: 4, height: 0.6, weight: 8.5, types: 'fire'},
  {name: 'Squirtle', number: 7, height: 0.5, weight: 9, types: 'water'}  
];

//loop to display name and height of pokemon, with conditional message for height <= 0.5
for (let i = 0; i < pokemonList.length; i++) {
    document.write(("<br>" + pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'm)'));
    
    if (pokemonList[i].height <= 0.5) {
        document.write(' - Aww, look at that little guy!');
    }
}