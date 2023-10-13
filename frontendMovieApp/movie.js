// Define API endpoints and constants
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1610cb9ae9b46a81ada55e0395e3ec16&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=1610cb9ae9b46a81ada55e0395e3ec16&query=';

// Get references to HTML elements
const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

// Initial load of movies from the API
returnMovies(APILINK);

// Function to fetch and display movies
function returnMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then(function(data) {
        console.log(data.results);
        // Loop through movie results
        data.results.forEach((element) => {
          // Create HTML elements for each movie
          const div_card = document.createElement('div');
          div_card.setAttribute('class', 'card');

          const div_row = document.createElement('div');
          div_row.setAttribute('class', 'row');

          const div_column = document.createElement('div');
          div_column.setAttribute('class', 'column');

          const image = document.createElement('img');
          image.setAttribute('class', 'thumbnail');

          const title = document.createElement('h3');
          title.setAttribute('class', 'card');

          const center = document.createElement('center');

          // Set the movie title and image source
          title.textContent = element.title;
          image.src = IMG_PATH + element.poster_path;

          // Append elements to the DOM
          center.appendChild(image);
          div_card.appendChild(center);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);
          main.appendChild(div_row);
        });
      });
}

// Add an event listener for the search form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = ''; // Clear the existing movie list

    const searchItem = search.value;

    if (searchItem) {
        // Fetch and display movies based on the search query
        returnMovies(SEARCHAPI + searchItem);
        search.value = ''; // Clear the search input
    }
});
