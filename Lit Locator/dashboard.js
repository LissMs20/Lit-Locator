document.addEventListener('DOMContentLoaded', () => {
    fetch('/listar-livros-favoritos')
        .then(response => response.json())
        .then(data => {
            const favoriteBooksTable = document.getElementById('favoriteBooksTable');
            data.forEach(book => {
                const row = favoriteBooksTable.insertRow();
                row.insertCell(0).textContent = book.title;
                row.insertCell(1).textContent = book.authors;
                row.insertCell(2).textContent = book.publisher;
                row.insertCell(3).textContent = book.publishedDate;
            });

            const totalFavorites = data.length;
            document.getElementById('totalFavorites').textContent = totalFavorites;

            const authorCounts = {};
            data.forEach(book => {
                book.authors.split(',').forEach(author => {
                    authorCounts[author] = (authorCounts[author] || 0) + 1;
                });
            });

            const favoriteAuthorsList = Object.entries(authorCounts)
                .map(([author, count]) => `${author}: ${count}`);
            document.getElementById('favoriteAuthors').innerHTML = favoriteAuthorsList.join('<br>');

            const booksAuthorChartCanvas = document.getElementById('booksAuthorChart');
            const authors = Object.keys(authorCounts);
            const bookCounts = Object.values(authorCounts);

            new Chart(booksAuthorChartCanvas, {
                type: 'bar',
                data: {
                    labels: authors,
                    datasets: [
                        {
                            label: 'Número de Livros',
                            data: bookCounts,
                            backgroundColor: 'rgba(45, 0, 87, 0.8)',
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            const publishers = data.map(book => book.publisher);
            const publisherCounts = {};
            publishers.forEach(publisher => {
                publisherCounts[publisher] = (publisherCounts[publisher] || 0) + 1;
            });
            const favoritePublishersList = Object.entries(publisherCounts).map(([publisher, count]) => `${publisher}: ${count}`);
            document.getElementById('favoritePublishers').innerHTML = favoritePublishersList.join('<br>');

            const years = data.map(book => book.publishedDate.substring(0, 4));
            const yearCounts = {};
            years.forEach(year => {
                yearCounts[year] = (yearCounts[year] || 0) + 1;
            });

            const booksByYearList = Object.entries(yearCounts).map(([year, count]) => `${year}: ${count}`);
            document.getElementById('booksByYear').innerHTML = booksByYearList.join('<br>');

            const booksByYearChartCanvas = document.getElementById('booksByYearChart');
            const booksByYearData = Object.values(yearCounts);
            const booksByYearLabels = Object.keys(yearCounts);
            new Chart(booksByYearChartCanvas, {
                type: 'bar',
                data: {
                    labels: booksByYearLabels,
                    datasets: [
                        {
                            label: 'Número de Livros',
                            data: booksByYearData,
                            backgroundColor: 'rgba(171, 61, 50, 0.8)',
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            const uniqueTitles = new Set(data.map(book => book.title));
            document.getElementById('uniqueTitles').textContent = uniqueTitles.size;
        })

        .catch(error => {
            console.error("Erro ao buscar livros favoritos:", error);
        });
});
