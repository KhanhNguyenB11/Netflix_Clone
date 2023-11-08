import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../Request";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext/AuthContext";
function Movie({ movie, displayType = "default", list }) {
  const defaultType =
    "w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2";
  const listType =
    "w-[160px] sm:w-[200px] h-auto md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2";
  const { user } = useContext(AuthContext);
  const [showComponent, setShowComponent] = useState(true);
  function handleRemove() {
    const newMovieArr = list.movies.filter((item) => item != movie.id);
    axios
      .put(`${API_URL}users/${user._id}/lists/${list._id}`, {
        ...list,
        movies: newMovieArr,
      },{
        headers: {token: "bearer " + user.accessToken,}
      })
      .then(() => {
        setShowComponent(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    showComponent && (
      <div className={displayType == "default" ? defaultType : listType}>
        <img
          className="w-full h-auto block"
          src={
            displayType == "default"
              ? `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
              : `https://image.tmdb.org/t/p/w342/${movie?.poster_path}`
          }
          alt={movie?.title}
        />

        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/40 opacity-0 hover:opacity-100">
          <Link to={`/watch/eNvUS-6PTbs`}>
            <p className="text-white flex justify-center items-center font-bold h-full text-center">
              {movie?.title}
            </p>
          </Link>
          <p>
            <FaRegHeart className="absolute top-4 left-4 text-gray-300"></FaRegHeart>
          </p>
          <p>
            {displayType !== "default" ? (
              <AiOutlineDelete
                className="absolute top-4 right-4 text-gray-300"
                onClick={handleRemove}
              ></AiOutlineDelete>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    )
  );
}

export default Movie;
