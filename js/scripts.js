let pokemonList = [
  {name: 'Bulbasaur', number: 1, height: 0.7, weight: 6.9, types: ['grass', 'poison']},
  {name: 'Charmander', number: 4, height: 0.6, weight: 8.5, types: 'fire'},
  {name: 'Squirtle', number: 7, height: 0.5, weight: 9, types: 'water'}  
];

//loop to display name and height of pokemon, with conditional message for height <= 0.5
function printArrayDetails(list) {
  for (let i = 0; i < list.length; i++) {
    document.write(("<br>" + list[i].name + ' (height: ' + list[i].height + 'm)'));
    
    if (list[i].height <= 0.5) {
      document.write(' - Aww, look at that little guy!');
    }
  }
}
printArrayDetails(pokemonList);