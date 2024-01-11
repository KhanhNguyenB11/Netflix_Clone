import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Request";
import Movie from "../components/Movie";
function Search() {
  const { title: searchkey } = useParams();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function searchMovieByTitle(searchkey) {
      await axios
        .get(`${API_URL}movies/search/${searchkey}`)
        .then((res) => {
          setMovies(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    searchMovieByTitle(searchkey);
  }, [searchkey]);
  return (
    <div className="bg-black h-screen w-full">
      {movies.length > 0
        ? movies.map((movie) => {
            return <Movie key={movie._id} movie={movie}></Movie>;
          })
        : ""}
    </div>
  );
}

export default Search;
