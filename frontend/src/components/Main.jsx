import { useEffect, useState } from "react";
import request from "../Request.js";
import axios from "axios";
import { Link } from "react-router-dom";
function Main() {
  const [movies, setMovies] = useState("");
  const feature_movie = movies[Math.floor(Math.random() * movies.length)];
  function truncateString(str, num) {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  }
  useEffect(() => {
    let ignore = false;
    async function getdata() {
      try {
        const res = await axios.get(request.requestPopular);
        setMovies(res.data);
      } catch (error) {
        console.error("Error occurred: ", error);
      }
    }
    if (!ignore) {
      getdata();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    feature_movie && (
      <div className="w-full h-[550px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${feature_movie?.backdrop_path}`}
            alt={feature_movie?.title}
          />
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-4xl py-3 font-bold ">{feature_movie?.title}</h1>
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:text-white hover:bg-black transition-all duration-300">
              <Link to={`/watch/${feature_movie.title}`} state={feature_movie}>
                Play
              </Link>
            </button>
            <button className="border text-white border-white py-2 px-5 ml-5 hover:bg-white hover:text-black transition-all duration-300">
              Watch Later
            </button>
            <p className="text-gray-400 text-sm my-3">{`Released: ${feature_movie?.release_date}`}</p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {truncateString(feature_movie?.overview, 200)}
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default Main;
