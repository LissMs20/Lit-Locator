function searchBooks() {
    var searchTerm = document.getElementById("searchInput").value;
    var apiKey = "AIzaSyAPpyXK32uEd61os_vYJVl73qEE4SvsJPA";
    var apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=" + apiKey;

    document.getElementById("searchResults").innerHTML = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error("Erro ao buscar livros:", error);
        });
}

function displayResults(books) {
    var resultsContainer = document.getElementById("searchResults");

    if (books.length === 0) {
        resultsContainer.innerHTML = "<p class='no-results'>Nenhum resultado encontrado.</p>";
        return;
    }

    var resultsHTML = "<div class='results-container'>";
    resultsHTML += "<h2 class='results-heading'>Resultados da pesquisa:</h2>";
    resultsHTML += "<ul class='results-list'>";

    books.forEach(book => {
        resultsHTML += "<li class='result-item'>";
        resultsHTML += `<h3 class='result-title'>${book.volumeInfo.title}</h3>`;
        resultsHTML += `<p class='result-info'>Autor: ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconhecido'}</p>`;
        resultsHTML += `<p class='result-info'>Editora: ${book.volumeInfo.publisher || 'Desconhecida'}</p>`;
        resultsHTML += `<p class='result-info'>Publicado em: ${book.volumeInfo.publishedDate || 'Desconhecido'}</p>`;
        
        // Verificará se a propriedade imageLinks está presente e exibe a imagem da capa do livro
        if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
            resultsHTML += `<img src="${book.volumeInfo.imageLinks.thumbnail}" alt="Capa do Livro" class='result-image'>`;
        } else {
            resultsHTML += "<p class='result-info'>Imagem não disponível</p>";
        }
        
        resultsHTML += `<p class='result-link'><a href="${book.volumeInfo.previewLink}" target="_blank">Ver mais</a></p>`;
        resultsHTML += "</li>";
    });

    resultsHTML += "</ul>";
    resultsHTML += "</div>";

    resultsContainer.innerHTML = resultsHTML;
}


