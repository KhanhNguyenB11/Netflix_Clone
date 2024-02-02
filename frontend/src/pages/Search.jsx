import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Request";
import Movie from "../components/Movie";
import UserNavbar from "../components/UserNavbar";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authcontext/AuthContext";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
function Search() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const [title, setTitle] = useState(searchParams.get("q"));
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q"));
  const page = searchParams.get("page");
  useEffect(() => {
    handlePageClick({ selected: page ? parseInt(page) - 1 : 0 });
    console.log(title);
  }, [title]);
  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    navigate({
      pathname: "/search",
      search: `?q=${searchQuery}&page=1`,
    });
    setTitle(searchQuery);
  }
  async function handlePageClick(event) {
    try {
      setIsLoading(true);
      // Update the URL with the new page query parameter
      navigate({
        pathname: "/search",
        search: `?q=${title}&page=${event.selected + 1}`,
      });

      // Fetch movies for the new page
      const response = await axios.get(
        `${API_URL}movies/search?q=${title}&page=${event.selected + 1}`
      );

      // Update the state with the new data
      setMovies(response.data.movies);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
      // Handle errors here
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="bg-black h-screen w-full ">
      <div>
        <UserNavbar hideSearch={true}></UserNavbar>
      </div>
      <div className="pt-20">
        {/* Search section */}
        <div className="w-full flex justify-center">
          <form className="w-[75%]" onSubmit={(e) => handleSearchSubmit(e)}>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <FaSearch></FaSearch>
              </button>
            </div>
          </form>
        </div>
        {/* Genre and Sorting */}
        <div className="w-full flex justify-center">
          <div className="w-[75%] flex justify-start gap-5 my-5 ">
            <select name="" id="" className="p-2 rounded-sm">
              <option value="0">Sort</option>
              <option value="1">Popularity</option>
              <option value="2">Release Date </option>
              <option value="3">Rating</option>
            </select>
            <select id="movieGenres" className="p-2">
              <option value="0">Genres</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="80">Crime</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="10770">TV Movie</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center p-7">
            <Loading></Loading>
          </div>
        ) : (
          <div>
            {/* Movies list */}
            
            <div>
              <h1 className="text-white text-2xl font-bold">Search Result:</h1>
              <div className="grid grid-cols-4 h-full">
                {movies.length > 0
                  ? movies.map((movie) => {
                      return <Movie key={movie._id} movie={movie}></Movie>;
                    })
                  : (
                    <div className="flex w-screen justify-center">
                      <h1 className="text-2xl font-bold text-white">Can&apos;t find any movies</h1>
                    </div>
                  )}
              </div>
            </div>
            {/* Pagination */}
            <div className="flex gap-3 text-white w-full justify-center items-center p-2">
              <ReactPaginate
                activeClassName="bg-red-600 hover:bg-red-700 transiton-colors duration-300 text-white p-3"
                previousClassName="border text-white border-white py-2 px-5 hover:bg-white hover:text-black transition-all duration-300"
                nextClassName="border text-white border-white py-2 px-5 hover:bg-white hover:text-black transition-all duration-300"
                disabledClassName="bg-gray-400 text-white p-3"
                pageClassName="border text-xl text-white border-white py-2 px-4 hover:bg-white hover:text-black transition-all duration-300"
                breakLabel="..."
                nextLabel="Next"
                forcePage={page ? parseInt(page) - 1 : 0}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                className="flex gap-3 text-white w-full justify-center items-center p-2 cur"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
