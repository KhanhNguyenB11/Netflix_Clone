import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
function Movie({ movie }) {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  return (
    <Link to={`/watch/eNvUS-6PTbs`}>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/40 opacity-0 hover:opacity-100">
          <p className="text-white flex justify-center items-center font-bold h-full text-center">
            {movie?.title}
          </p>
          <p>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300"></FaHeart>
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300"></FaRegHeart>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Movie;
