const key = "b72fc2cf9b7fad685567a5c20efc7997"
const request = {
    requestPopular: `http://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `http://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `http://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestUpcoming: `http://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestHorror: `http://api.themoviedb.org/3/search/movie?api_key=${key}&query=horror&language=en-US&page=1`,
}
export default request;