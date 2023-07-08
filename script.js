const searchInput = document.getElementById('movie-search');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

// Function to fetch movie data from API
async function searchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=yourapikey`);
    const data = await response.json();
    return data.Search;
}

// Function to display movie results
function displayResults(results) {
    resultsDiv.innerHTML = '';
    if (results !== undefined && results.length > 0) {
        for (const result of results) {
            const div = document.createElement('div');
            div.className = 'result';
            const img = document.createElement('img');
            img.src = result.Poster;
            const infoDiv = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = result.Title;
            const year = document.createElement('p');
            year.textContent = result.Year;
            const type = document.createElement('p');
            type.textContent = result.Type;
            infoDiv.appendChild(title);
            infoDiv.appendChild(year);
            infoDiv.appendChild(type);
            div.appendChild(img);
            div.appendChild(infoDiv);
            resultsDiv.appendChild(div);
        }
    } else {
        const message = document.createElement('p');
        message.textContent = 'No results found.';
        resultsDiv.appendChild(message);
    }
}

// Event listener for search button click
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        const results = await searchMovies(query);
        displayResults(results);
    }
});

// Event listener for enter key press in search input
searchInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query !== '') {
            const results = await searchMovies(query);
            displayResults(results);
        }
    }
});