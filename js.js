let btnInventory = document.getElementById("inventory");
if (sessionStorage.length>0){
    var pokemon = new Set (JSON.parse(sessionStorage.getItem("pokemon")));
    //console.log(pokemon);
}
else var pokemon = new Set();

btnInventory.addEventListener("click" , function(){
    sessionStorage.setItem('pokemon', JSON.stringify(Array.from(pokemon)));
    document.location.href = 'catch.html';
})

document.getElementById("n_mypokemon").innerHTML = pokemon.size;

let limite = 20;
let partenza = 1;

let mostra_altro = document.getElementById("See_more");

window.addEventListener("load", function() {
    mostra_pokemon(limite, partenza);
        
});

function mostra_pokemon (limite, partenza) {

for (let index = partenza; index < limite; index++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/` + index)
    .then(response => response.json())
    .then(data => {

        let div = document.createElement("div");
        div.id = index;
        div.textContent = data.name.toUpperCase();
        div.style ="font-weight: bolder; font-family: system-ui, -apple-system, BlnikMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; "
        div.style.display = "inline-block";
        div.className = "elimina";

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

        console.log(data);
        let img = document.createElement("img");
        img.src = data.sprites.front_default;

        let btn = document.createElement("button");
        btn.id =index; 
        btn.addEventListener( "click" , function () {
            catturaPokemon(btn.id)
        } 
        )
        btn.textContent = "Catch";
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
                <td >Abilities:</td>
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


function catturaPokemon(id){
    pokemon.add(id)
    document.getElementById("n_mypokemon").innerHTML = pokemon.size;
}

window.addEventListener("load", function() {
    var bottoneTornaInAlto = document.getElementById("tornaInAlto");
  
    window.addEventListener("scroll", function() {
      if (window.scrollY > 100) {
        bottoneTornaInAlto.style.display = "block";
      } else {
        bottoneTornaInAlto.style.display = "none";
      }
    });
  
    bottoneTornaInAlto.addEventListener("click", function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
});


let ordinamento_id = true;
let ordinamento_alfabetico = false;
mostra_altro.addEventListener("click", () => {
    partenza = limite;
    limite += 20;
    if (ordinamento_id) mostra_pokemon(limite, partenza);
    else ordinamentoAlfabetico(limite, partenza);
});

document.addEventListener("DOMContentLoaded", function () {
    const seeMoreButton = document.getElementById("See_more");
    const tornaInAltoButton = document.getElementById("tornaInAlto");
    function mostraBottoneSeeMore() {
        const altezzaFinestra = window.innerHeight;
        const altezzaDocumento = document.documentElement.scrollHeight;
        const posizioneScroll = window.scrollY;
        if (altezzaFinestra + posizioneScroll + 40 >= altezzaDocumento) {
            seeMoreButton.style.display = "block";
        } else {
            seeMoreButton.style.display = "none";
        }
    }
    window.addEventListener("scroll", mostraBottoneSeeMore);
        tornaInAltoButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});















let tutti_pokemon = [];
function rimuoviPokemon() {
var elementsToDelete = document.querySelectorAll(".elimina");

elementsToDelete.forEach(function(element) {
    element.parentNode.removeChild(element);
});


}


function ordinamentoAlfabetico(limite, partenza) {
    rimuoviPokemon();
    ordinamento_alfabetico = true;
    ordinamento_id = false;

    const fetchPromises = [];

    for (let index = partenza; index < limite; index++) {
        const fetchPromise = fetch(`https://pokeapi.co/api/v2/pokemon/` + index)
            .then(response => response.json());
        fetchPromises.push(fetchPromise);
    }

    Promise.all(fetchPromises)
        .then(data_secondoArray => {
            tutti_pokemon = data_secondoArray;
            function SortArray(x, y) {
                if (x.name < y.name) {
                  return -1;
                }
                if (x.name > y.name) {
                  return 1;
                }
                return 0;
              }
              let nuovo_vettore = tutti_pokemon.sort(SortArray);
            visualizza(nuovo_vettore);
        })
        .catch(error => { console.error('Si è verificato un errore'); });
}


function visualizza (v){

            for (let index = 0; index < 20; index++) {
                const data = v[index];
                

            
            let div = document.createElement("div");
            div.textContent = data.name.toUpperCase();
            div.style.display = "inline-block";
            div.className = "elimina";
            console.log(data);

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
            btn.addEventListener( "click" , function () {
                catturaPokemon(btn.id)
            } 
            )
            btn.textContent = "Catch";
            div.append(btn);
    
    
            let btn2 = document.createElement("button");
            btn2.textContent = "Info";
    
            btn2.addEventListener("click", () => {
                const modal = document.getElementById("myModal");
                const pokemonDetails = document.getElementById("pokemonDetails");
                const caratteristiche = document.getElementById("caratteristiche");
    
            
                pokemonDetails.innerHTML = `
                    <p style="">Nome: ${data.name.toUpperCase()}</p>
                    <img src="${data.sprites.front_default}">
                    <p>ID: ${data.id}</p>
    
                `;
    
    
                caratteristiche.innerHTML = `
                    <table>
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
            });
        
            div.append(img);
            div.append(btn);
            div.append(btn2);
            document.body.append(div);
        }   
}

function ordinamentoPerID() {
    rimuoviPokemon();
    ordinamento_alfabetico = false;
    ordinamento_id = true;
    mostra_pokemon(20, 1);
}
