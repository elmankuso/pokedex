const pokemonCount = 151;

const pokedex = {};// {1: {"name" : "bulbasaur", "img" : URL, "type" : ["grass", "poison"], "desc" : "..."}, 2: ...}

window.onload = async function(){
    //getPokemon(1);
    for(let i=1; i<= pokemonCount; i++){
        await getPokemon(i);
        
        let pokemon = document.createElement("div");
        // <div></div>
        pokemon.id = i;
        // <div id= i></div>
        pokemon.innerText = i.toString()+ ". "+ pokedex[i]["name"].toUpperCase();
        // <div id= i>BULBASAUR</div>
        pokemon.classList.add("pokemon-name");
        // <div id= i class="pokemon-name">BULBASAUR</div>
        document.getElementById("pokemon-list").append(pokemon)
        // <div id= i class="pokemon-name">BULBASAUR</div> <- lo inserta en el div "pokemon-list" 

        pokemon.addEventListener("click", updatePokemon);
    }
    console.log(pokedex);

    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
}

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/"+ num.toString();
    
    let res = await fetch(url)
    let pokemon = await res.json();
    //console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonTypes = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"]; // returns URL of img

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();
    pokemonDesc = pokemonDesc["flavor_text_entries"][26]["flavor_text"];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "type" : pokemonTypes, "desc" : pokemonDesc}

}

function updatePokemon(){

    //update img
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear previous types
    let typesDiv = document.getElementById("pokemon-types");
    while(typesDiv.firstChild){
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["type"];
    for(let i = 0; i< types.length; i++){
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        typesDiv.append(type)
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}