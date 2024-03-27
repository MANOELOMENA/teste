const filmesearchBox = document.getElementById('movie-search-box')
const searchList = document.getElementById('search-list')
const resultGrid = document.getElementById('result-grid')

async function CarregarFilmes(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`
    const res = await fetch(`${URL}`)
    const data = await res.json()
    if(data.Response == "True") listadefilmes(data.Search)
}

function encontrarFIlmes(){
    let searchTerm = (filmesearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list')
        CarregarFilmes(searchTerm);
    } else {
        searchList.classList.add('hide-search-list')
    }
}

function listadefilmes(filmes){
    searchList.innerHTML = "";
    for(let idx = 0; idx < filmes.length; idx++){
        let listafilmes = document.createElement('div')
        listafilmes.dataset.id = filmes[idx].imdbID
        listafilmes.classList.add('search-list-item')
        if(filmes[idx].Poster != "N/A")
            posterfilme = filmes[idx].Poster
        else 
            posterfilme = "image_não_encontrada.png"

        listafilmes.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${posterfilme}">
        </div>
        <div class = "search-item-info">
            <h3>${filmes[idx].Title}</h3>
            <p>${filmes[idx].Year}</p>
        </div>
        `
        searchList.appendChild(listafilmes)
    }
    carregarfilmesD()
}

function carregarfilmesD(){
    const searchListfilmes = searchList.querySelectorAll('.search-list-item')
    searchListfilmes.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list')
            filmesearchBox.value = ""
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`)
            const movieDetails = await result.json()
            Detalhes(movieDetails)
        });
    });
}

function Detalhes(details){
    resultGrid.innerHTML = `
    <div class = "poster-filmes">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_não_encontrada.png"}" alt = "Poster Filme">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list')
    }
})
function fecharModal(tipo) {
    var modal = document.getElementById('modal-' + tipo);
    modal.style.display = 'none';
}
function toggleModal(tipo) {
    var modal = document.getElementById('modal-' + tipo);
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

function validaFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('confirmSenha').value;
    const resultado = document.getElementById('resultado');

    if (nome === '' || email === '' || senha === '' || confirmSenha === '') {
        resultado.textContent = 'Por favor, preencha todos os campos.';
        resultado.className = 'erro';
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        resultado.textContent = 'Por favor, insira um e-mail válido.';
        resultado.className = 'erro';
        return;
    }
    
    if (senha.length < 8) {
        resultado.textContent = 'A senha deve ter no mínimo 8 caracteres.';
        resultado.className = 'erro';
        return;
    }
    
    if (confirmSenha !== senha) {
        resultado.textContent = 'As senhas não coincidem.';
        resultado.className = 'erro';
        return;
    }
}
