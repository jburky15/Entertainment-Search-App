const API_URL = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=bc7ddc3d0727eb2b59564faf3ba59022'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/tv?api_key=bc7ddc3d0727eb2b59564faf3ba59022&query="'
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getShows(API_URL)

//Get TV show info from the API
async function getShows(url) {
    const res = await fetch(url)
    const data = await res.json()

    showTv(data.results)
}

//Add data from the API to the cards
function showTv(tvShows) {
    main.innerHTML = ''

    tvShows.forEach((show) => {
        const { name, poster_path, vote_average, overview, id, season_number } = show

        const tvEl = document.createElement('div')
        tvEl.classList.add('show')

        tvEl.innerHTML = 
         `<a href="https://www.themoviedb.org/tv/${id}" target="_blank"><img src="${IMAGE_PATH + poster_path}" alt="${name}"></a>
            <div class="tv-info">
                <h3>${name}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <a href="https://www.themoviedb.org/tv/${id}" target="_blank">${overview}</a>
            </div>`

        main.appendChild(tvEl)
    })
}

//Change the rating based on average score
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

//Search for TV shows
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getShows(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
