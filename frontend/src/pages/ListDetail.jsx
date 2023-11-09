import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../Request";
import Movie from "../components/Movie";
function ListDetail() {
  const location = useLocation();
  const list = location.state;
  const ids = { ids: location.state.movies };
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .post(`${API_URL}movies/getlist`, ids)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
      });
  }, []);
  console.log(list);
  return (
    <div className="mt-5">
      <h1 className="text-white text-2xl p-4">List Details</h1>
      <div className="text-white grid grid-cols-4 px-32 gap-4">
        {movies.map((movie) => (
          <Movie movie={movie} key={movie?.id} displayType="Poster" list={list}/>
        ))}
      </div>
    </div>
  );
}
export default ListDetail;
