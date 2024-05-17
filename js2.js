
var pokemon = JSON.parse(sessionStorage.getItem("pokemon"));
var btnPokedex = document.getElementById("pokedex");

window.addEventListener("load", function() {
    document.getElementById("n_mypokemon").innerHTML = pokemon.length;
    mostra_pokemon(pokemon.length);
    
});
function mostra_pokemon (limite) {


for (let index = 0; index < limite; index++) {
fetch(`https://pokeapi.co/api/v2/pokemon/` + pokemon[index])
.then(response => response.json())
.then(data => {

    let div = document.createElement("div");
    div.id = index;
    div.textContent = data.name.toUpperCase();
    div.style ="font-weight: bolder; font-family: system-ui, -apple-system, BlnikMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
    div.style.display = "inline-block";
    
    switch (data.types[0].type.name) {
        case "grass": div.style.backgroundColor = "green"; break;
        case "fire": div.style.backgroundColor = "red";break;
        case "water": div.style.backgroundColor = "rgb(173, 216, 230)";break;
        case "electric": div.style.backgroundColor = "yellow";break;
        case "ground": div.style.backgroundColor = "brown";break;
        case "rock": div.style.backgroundColor = "gray";break;
        case "steel": div.style.backgroundColor = "rgb(128, 128, 128)";break;
        case "psychic": div.style.backgroundColor = "purple";break;
        case "dark": div.style.backgroundColor = "black";break;
        case "normal": div.style.backgroundColor = "beige";break;
        case "flying": div.style.backgroundColor = "rgb(0, 0, 139)";break;
        case "poison": div.style.backgroundColor = "purple";break;
        case "fighting": div.style.backgroundColor = "rgb(139, 0,0)";break;
        case "bug": div.style.backgroundColor = "green";break;
        case "ghost": div.style.backgroundColor = "black";break;
        case "dragon": div.style.backgroundColor = "rgb(0, 0, 128)";break;
        case "ice": div.style.backgroundColor = "white";break;
        case "fairy": div.style.backgroundColor = "pink";break;
        default:
            div.style.backgroundColor = "green";

            break;
    }


    let img = document.createElement("img");
    img.src = data.sprites.front_default;


    let btn = document.createElement("button");
    btn.id =index; 
    btn.textContent = "Free";
    btn.addEventListener( "click" , function () {
        liberaPokemon(btn.id)
    } 
    )
    div.append(btn);


    let btn2 = document.createElement("button");
    btn2.textContent = "Info";

    btn2.addEventListener("click", () => {
        const modal = document.getElementById("myModal");
        const pokemonDetails = document.getElementById("pokemonDetails");
        const caratteristiche = document.getElementById("caratteristiche");
    
        pokemonDetails.innerHTML = `
        <p style="font-weight: bolder; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Nome: ${data.name.toUpperCase()}</p>
        <img src="${data.sprites.front_default}">
        <p style="font-weight: bolder; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">ID: ${data.id}</p>

    `;


    caratteristiche.innerHTML = `
        <table style="font-weight: bolder; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <td>Abilities:</td>
        <td>
        ${data.abilities[0] ? data.abilities[0].ability.name : ''}
        ${data.abilities[1] ? ', ' + data.abilities[1].ability.name : ''}
        </td>

            <tr>
                <td>Base experience:</td>
                <td>${data.base_experience}</td>
            </tr>
            <tr>
                <td>Move:</td>
                <td>${data.moves[0].move.name}</td>
            </tr>
            <tr>
                <td>Height:</td>
                <td>${data.height}</td>
            </tr>
            <tr>
                <td>Type:</td>
                <td>${data.types[0].type.name}</td>
            </tr>
            <tr>
                <td>Weight:</td>
                <td>${data.weight + ' kg'}</td>
            </tr>
        </table>
    `;

        modal.style.display = "block";
        modal.style.transform = "translate(-50%, -50%) scale(1)";


        //animazione div

        
        
    



        console.log(pokemon)

    });
    
    div.append(img);
    div.append(btn);
    div.append(btn2);
    document.body.append(div);
    
})
.catch(error => { console.error('Si è verificato un errore'); });
}

}

document.getElementById("closeModal").addEventListener("click", () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});
btnPokedex.addEventListener("click" , function(){
    sessionStorage.setItem('pokemon', JSON.stringify(Array.from(pokemon)));
    document.location.href = 'index.html';
})
function liberaPokemon(index){
    if (pokemon.length > 1) {
        pokemon.splice(pokemon.indexOf(index), 1);
      } else {
        pokemon = [];
      }
    let div = document.getElementById(index);
    div.remove();
    document.getElementById("n_mypokemon").innerHTML = pokemon.length;
}
