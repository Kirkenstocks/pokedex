let pokemonRepository=function(){let e=[];function t(t){"object"==typeof t&&"name"in t?e.push(t):console.log("Pok\xe9mon input is not correct")}function n(){return e}function i(e){return fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.name=t.species.name,e.number=t.id,e.imageUrl=t.sprites.front_default,e.height=t.height/10,e.weight=t.weight/10,e.types=t.types.map(function(e){return e.type.name})}).catch(function(e){console.error(e),alert("Unable to load Pok\xe9mon data.")})}function o(e){i(e).then(function(){var t;let n,i,o,a,r,l,c,s,p;t=e,n=document.querySelector(".modal-title"),i=document.querySelector(".modal-body"),n.innerHTML="",i.innerHTML="",o=t.name.charAt(0).toUpperCase()+t.name.slice(1),(a=document.createElement("h3")).innerText=o,a.classList.add("modal-title"),(r=document.createElement("img")).setAttribute("src",t.imageUrl),r.setAttribute("alt","A small frontal image of"+o),(l=document.createElement("p")).innerText="Pok\xe9dex ID number: "+t.number,(c=document.createElement("span")).innerText="Height: "+t.height+" m / ",(s=document.createElement("span")).innerText="Weight: "+t.weight+" kg",(p=document.createElement("p")).innerText="Type(s): "+t.types.join(" / "),n.appendChild(a),i.appendChild(r),i.appendChild(l),i.appendChild(c),i.appendChild(s),i.appendChild(p)})}return{add:t,getAll:n,showDetails:o,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),i=document.createElement("li");i.classList.add("list-group-item","col-md-4","col-sm-6","d-inline-flex","justify-content-center");let a=document.createElement("button");a.innerText=t.name,a.classList.add("button","btn","btn-outline-primary","btn-lg","col-10","pokemon-button"),a.setAttribute("data-target","#exampleModal"),a.setAttribute("data-toggle","modal"),i.appendChild(a),n.appendChild(i),a.addEventListener("click",()=>{o(t)})},loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){t({name:e.name.charAt(0).toUpperCase()+e.name.slice(1),detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});