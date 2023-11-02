import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {FaHeart,FaRegHeart} from "react-icons/fa";
function Row({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);
  const [like,setLike] = useState(false);
  const ignore = useRef(false);
  useEffect(() => {
    if (!ignore.current) {
      axios
        .get(fetchURL)
        .then((Response) => {
          setMovies(Response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => {
        ignore.current = true;
      };
    }
  }, [fetchURL]);

  return (
    <div>
      <h2 className="text-white font-bold p-4 text-3xl">{title}</h2>
      <div className="flex relative items-center">
        <div id={`slider`}>
          {movies.map((movie) => (
            <div key={movie?.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt={movie?.title} />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/40 opacity-0 hover:opacity-100">
                    <p className="text-white flex justify-center items-center font-bold h-full text-center">{movie?.title}</p>
                    <p>
                        {like ? <FaHeart className="absolute top-4 left-4 text-gray-300"></FaHeart>:<FaRegHeart className="absolute top-4 left-4 text-gray-300"></FaRegHeart>}
                    </p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
