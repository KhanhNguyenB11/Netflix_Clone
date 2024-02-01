import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Request";
import Movie from "../components/Movie";
import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import Pagination from "../components/Pagination";

function Search() {
  const { title: searchkey } = useParams();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function searchMovieByTitle(searchkey) {
      await axios
        .get(`${API_URL}movies/search/${searchkey}`)
        .then((res) => {
          setMovies(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    searchMovieByTitle(searchkey);
  }, [searchkey]);
  return (
    <div className="bg-black h-full w-full">
      <div>
        <UserNavbar></UserNavbar>
      </div>
      <div className="pt-20">
      {/* Search section */}
        <div className="w-full flex justify-center m-5">
          <form className="w-[75%]">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Movies name..."
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* Movies list */}
        <div className="grid grid-cols-4 ">
          {movies.length > 0
            ? movies.map((movie) => {
                return <Movie key={movie._id} movie={movie}></Movie>;
              })
            : ""}
        </div>
        {/* Pagination */}
        <div className="flex gap-3 text-white w-full justify-center items-center p-2">
          <Pagination pageNum={"Previous"}></Pagination>
          <Pagination pageNum={1}></Pagination>
          <Pagination pageNum={2}></Pagination>
          <Pagination pageNum={3}></Pagination>
          <Pagination pageNum={"Next"}></Pagination>
        </div>
      </div>
    </div>
  );
}

export default Search;
