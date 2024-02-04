import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../Request";
import Movie from "../components/Movie";
import UserNavbar from "../components/UserNavbar";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import SortAndGenre from "../components/SortAndGenre";
function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const [title, setTitle] = useState(searchParams.get("q"));
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q"));
  const sortRef = useRef("");
  const genreRef = useRef("");
  const page = searchParams.get("page");

  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    navigate({
      pathname: "/search",
      search: `?q=${searchQuery}&page=1&genre=${
        genreRef.current.value || ""
      }&sortBy=${sortRef.current.value || ""}`,
    });
    setTitle(searchQuery);
  }
  async function handlePageClick(event) {
    try {
      setIsLoading(true);
      // Update the URL with the new page query parameter
      navigate({
        pathname: "/search",
        search: `?q=${title}&page=${event.selected + 1}&genre=${
          genreRef.current.value || ""
        }&sortBy=${sortRef.current.value || ""}`,
      });

      // Fetch movies for the new page
      const response = await axios.get(`${API_URL}movies/search`, {
        params: {
          q: title,
          page: event.selected + 1,
          genre: genreRef.current.value || null,
          sortBy: sortRef.current.value || null,
        },
      });
      // Update the state with the new data
      setMovies(response.data.movies);
      
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
      // Handle errors here
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortByParam = params.get('sortBy') || '';
    const genreParam = params.get('genre') || '';

    if (sortRef.current) {
      sortRef.current.value = sortByParam;
    }

    if (genreRef.current) {
      genreRef.current.value = genreParam;
    }
  }, []);

  useEffect(() => {
    handlePageClick({ selected: page ? parseInt(page) - 1 : 0 });
  }, [page, title,genreRef.current.value,sortRef.current.value]);

  return (
    <div className="bg-black h-screen w-full sm:resize-none">
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
        <SortAndGenre genreRef={genreRef} sortRef={sortRef}></SortAndGenre>
        {isLoading ? (
          <div className="flex justify-center items-center h-[360px]">
            <Loading></Loading>
          </div>
        ) : (
          <div>
            {/* Movies list */}
            <div className="pr-6 md:p-0 md:ml-6">
              <h1 className="text-white text-2xl font-bold p-3">Search Result:</h1>
              <div className="grid lg:grid-cols-6 h-full md:grid-cols-4 grid-cols-3">
                {movies.length > 0 ? (
                  movies.map((movie) => {
                    return <Movie key={movie._id} movie={movie}></Movie>;
                  })
                ) : (
                  <div className="flex w-screen justify-center">
                    <h1 className="text-2xl font-bold text-white">
                      Can&apos;t find any movies
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Pagination */}
        <div className="flex md:gap-3 gap-1 text-white w-full justify-center items-center ">
          <ReactPaginate
            activeClassName="bg-red-600 hover:bg-red-700 transiton-colors duration-300 text-white p-3"
            previousClassName="border text-white border-white py-2 md:px-5 hover:bg-white hover:text-black transition-all duration-300 md:text-xl text-md px-2"
            nextClassName="border text-white border-white py-2 md:px-5 hover:bg-white hover:text-black transition-all duration-300 md:text-xl text-md px-2"
            disabledClassName="bg-gray-400 text-white md:text-lg text-md px-2"
            pageClassName="border md:text-xl text-md text-white border-white py-2 px-2 md:px-4 hover:bg-white hover:text-black transition-all duration-300"
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

        <Footer></Footer>
      </div>
    </div>
  );
}

export default Search;
