import axios from "axios";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../Request";
import Movie from "../components/Movie";
function ListDetail() {
  const location = useLocation();
  const ids = { ids: location.state };
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
  return (
    <div className="text-white">
      ListDetails
      {movies.map((movie) => (
        <Movie movie={movie} key={movie?.id} />
      ))}
    </div>
  );
}
export default ListDetail;
