// busca o pokemon na API e inicia a consulta
async function buscar_pokemon() {
    let nomePokemon = buscarNomeDoPokemon()
    let resultadoDaApiPokemon = await fazerChamadaNaAPI(nomePokemon)
    resultadoEmTela(resultadoDaApiPokemon)
}

// guardar nome do pokemon para consulta na API
function buscarNomeDoPokemon() {
    let input = document.getElementById("nomeDoPokemon")
    return input.value.toLowerCase()
}

// chamada da API
async function fazerChamadaNaAPI(nomePokemon) {
    let resultado

    await $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + nomePokemon,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            resultado = res
        }
    });

    return resultado
}

// hub de configuração
function resultadoEmTela(resultadoDaApi) {
    console.log(resultadoDaApi)
    exibirNomePokemon(resultadoDaApi.name)
    exibirTiposPokemon(resultadoDaApi.types)
    exibirMovesPokemon(resultadoDaApi.moves)
    exibirImagemPokemon(resultadoDaApi.sprites)
}

// Mostra Imagem do Pokemon
function exibirImagemPokemon(sprites) {
    let imagemDoPokemon = document.getElementById("imagemDoPokemon")
    imagemDoPokemon.src = sprites.front_default
}

// Mostra as Habilidades do Pokemon
function exibirMovesPokemon(moves) {
    let HabilidadesDoPokemon = document.getElementById("movesPokemon")
    HabilidadesDoPokemon.innerHTML = ""
    moves.forEach(element => {
        HabilidadesDoPokemon.innerHTML += "<li>" + element.move.name + "</li>"
    });
}

// Mostrar o Nome do Pokemon
function exibirNomePokemon(name) {
    let colocaNomeNoPokemon = document.getElementById("nomePokemon")
    colocaNomeNoPokemon.innerHTML = name
}

// Mostra o Tipo do Pokemon
function exibirTiposPokemon(types) {
    let colocaTipoNoPokemon = document.getElementById("tipoPokemon")
    colocaTipoNoPokemon.innerHTML = ""

    types.forEach((element, index) => {
        colocaTipoNoPokemon.innerHTML += element.type.name
        if (!isTheLastElement(index, types))
            colocaTipoNoPokemon.innerHTML += ", "
    });
}

function isTheLastElement(index, array) {
    return index == (array.length - 1)
}