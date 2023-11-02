import React, { useEffect, useState, useRef } from "react";
import request from "../Request.js";
import axios from "axios";
function Main() {
  const ignore = useRef(false);
  const [movies, setMovies] = useState("");
  const feature_movie = movies[Math.floor(Math.random() * movies.length)];
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

  return <div className="w-full h-[600px] text-white">
    <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${feature_movie?.backdrop_path}`} alt={feature_movie?.title} />
        
    </div>
  </div>
}

export default Main;
