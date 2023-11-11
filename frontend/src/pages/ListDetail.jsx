import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../Request";
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
function ListDetail() {
  const location = useLocation();
  const list = location.state;
  const ids = { ids: location.state.movies };
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .post(`${API_URL}movies/getlist`, ids)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="text-white">
      <Link to="/" className="link">
        <img
          src="../../N_logo.svg"
          alt="Netflix_logo"
          className=" w-[200px] h-[100px] z-[100] hover:cursor-pointer"
        />
      </Link>
      {loading ? (
        <div className="grid place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-4 px-32 gap-4">
          {movies.map((movie) => (
            <Movie
              movie={movie}
              key={movie?.id}
              displayType="Poster"
              list={list}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default ListDetail;
