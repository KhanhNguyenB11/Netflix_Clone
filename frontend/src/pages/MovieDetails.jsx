import React, { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { API_URL } from "../Request";
import { Link } from "react-router-dom";
function MovieDetails() {
  const location = useLocation();
  const movie = location.state;
  const [genre, setGenre] = useState();
  console.log(movie);
  useEffect(() => {
    axios
      .post(`${API_URL}genres/find`, movie.genre_ids)
      .then((res) => {
        setGenre(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full h-full bg-black">
      <UserNavbar></UserNavbar>
      <div className="flex items-center justify-between h-full">
        <div className="py-20 mt-5 w-full flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`}
            alt=""
            className=" h-[529px] w-[500px]"
            
          />
        </div>
        <div className="p-20">
          <h1 className="text-white text-5xl font-bold">{movie.title}</h1>
          <p className="text-white text-gray-600">{movie.release_date}</p>
          <h2 className="text-white text-xl font-bold">OVERVIEW</h2>
          <div className="bg-gray-700 h-[0.1rem]"></div>
          <div className="text-white">
            <p>{movie.overview}</p>
            <div className="flex gap-12">
              <p className="text-gray-600">Vote Average</p>
              <p>{movie.vote_average}</p>
            </div>
            <div className="flex gap-12">
              <p className="text-gray-600">Popularity</p>
              <p>{movie.popularity}</p>
            </div>
            <div className="flex gap-12">
              <p className="text-gray-600">Genre</p>
              <p>
              {genre&&genre.map(item=>item.name).join(", ")}
              </p>
            </div>
            <Link to={`/watch/${movie.title}`} state={movie}>
                <button className="bg-red-500 px-6 py-2 rounded cursor-pointer hover:bg-red-800 transition-all duration-300 mt-3">Watch Now</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MovieDetails;
