const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bc7ddc3d0727eb2b59564faf3ba59022'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=bc7ddc3d0727eb2b59564faf3ba59022&query="'
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getMovies(API_URL)

//Get movie data from the API
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

//Display the movie data to the cards
function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, release_date, id } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = 
         `<a href="https://www.themoviedb.org/movie/${id}" target="_blank"><img src="${IMAGE_PATH + poster_path}" alt="${title}"></a>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <a href="https://www.themoviedb.org/movie/${id}" target="_blank">${overview}</a>
            <div class ="release_date">
                <p>Release Date:</p>${release_date}
            </div>
            </div>
            </div>`

        main.appendChild(movieEl)
    })
}

//Change the color of the rating based on average score
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

//Search for movies
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
