const key = "b72fc2cf9b7fad685567a5c20efc7997";
export const API_URL = "http://localhost:8888/";
const request = {
    
    requestPopular: API_URL + "movies/popular",
    requestTopRated: API_URL + "movies/top_rated",
    requestGenre: API_URL + "movies/genre/",
    requestTrending: `http://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestUpcoming: `http://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
}

export default request;