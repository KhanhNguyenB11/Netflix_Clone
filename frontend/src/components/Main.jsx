import { useEffect, useState, useRef } from "react";
import request from "../Request.js";
import axios from "axios";
function Main() {
  const ignore = useRef(false);
  const [movies, setMovies] = useState("");
  const feature_movie = movies[Math.floor(Math.random() * movies.length)];
  function truncateString(str, num) {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  }
  useEffect(() => {
    if (!ignore.current) {
      axios
        .get(request.requestPopular)
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
  }, []);
  console.log(movies);

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${feature_movie?.backdrop_path}`}
          alt={feature_movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-4xl py-3 font-bold md:">
            {feature_movie?.title}
          </h1>
          <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
            Play
          </button>
          <button className="border text-white border-white py-2 px-5 ml-5">
            Watch Later
          </button>
          <p className="text-gray-400 text-sm my-3">{`Released: ${feature_movie?.release_date}`}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(feature_movie?.overview,200)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
