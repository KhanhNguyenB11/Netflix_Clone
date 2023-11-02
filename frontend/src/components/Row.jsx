import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
function Row({ title, fetchURL, rowID}) {
  const [movies, setMovies] = useState([]);
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
  function slideLeft(){
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  function slideRight(){
    let slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div>
      <h2 className="text-white font-bold p-4 text-3xl">{title}</h2>
      <div className="flex relative items-center group">
        <MdChevronLeft
        onClick={slideLeft}
          size={40}
          className="bg-white rounded-full absolute opacity-0 left-0 cursor-pointer z-10 group-hover:opacity-100  transition-opacity duration-300 ease-in-out"
        />

        <div
          id={"slider" + rowID}
          className="overflow-x-scroll w-full h-full whitespace-nowrap scroll-smooth relative scrollbar-hide"
        >
          {movies.map((movie) => (
            <Movie movie={movie} key={movie?.id} />
          ))}
        </div>
        <MdChevronRight
        onClick={slideRight}
          size={40}
          className="bg-white rounded-full absolute opacity-0 right-0 cursor-pointer z-10 group-hover:opacity-100  transition-opacity duration-300 ease-in"
        ></MdChevronRight>
      </div>
    </div>
  );
}

export default Row;
