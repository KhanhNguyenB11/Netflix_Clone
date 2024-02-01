import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext/AuthContext.jsx";
import { logout } from "../context/authcontext/AuthAction.js";
import { CiSearch } from "react-icons/ci";
const UserNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleIconClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Perform your action here, such as submitting the form or handling the Enter key press
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <div
      className={`${
        isScrolled
          ? "bg-main-color opacity-0 transition-all duration-300"
          : "bg-gradient-to-t from-transparent to-black via-main-color"
      } w-full text-white text-sm fixed z-50 mix-blend-normal`}
    >
      <div className=" px-4 mx-auto flex items-center justify-between h-16 absolute w-[100vw]">
        <div className="gap-4 flex items-center ">
          <Link to="/" className="link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix_logo"
              className=" w-[200px] h-[100px] z-[100] hover:cursor-pointer"
            />
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks hidden md:block lg:text-2xl md:text-lg sm:text-md">
              Series
            </span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks hidden md:block lg:text-2xl md:text-lg sm:text-md">
              Movies
            </span>
          </Link>
          <span className="lg:text-2xl md:text-lg sm:text-md">
            New and Popular
          </span>
          <Link to={`/${user.username}/list`}>
            <span className="lg:text-2xl md:text-lg sm:text-md">My List</span>
          </Link>
        </div>

        {/* right side */}
        <div className="gap-4 flex items-center mr-[50px] mix-blend-overlay">
          {/* Search */}
          <div className="flex items-center">
            <div
              className={`transition-transform transform ${
                isInputVisible ? "-translate-x-8" : "translate-x-0"
              }`}
            >
              <CiSearch
                className="h-6 w-6 cursor-pointer"
                onClick={handleIconClick}
              />
            </div>
            {isInputVisible && (
              <input
                type="text"
                placeholder="Search"
                className="p-2 rounded-md focus:outline-none focus:ring-0 focus:border-gray-900 text-black"
                onKeyDown={handleKeyPress}
              />
            )}
          </div>
          {/* User  */}
          <p className=" lg:text-2xl md:text-lg sm:text-md">{user.username}</p>
          <div className="group relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

            <div className=" flex-col opacity-0 absolute flex bg-gray-700 rounded-md group-hover:opacity-100 transition-all duration-300">
              <span className="p-2 cursor-pointer">Settings</span>
              <span
                className="p-2 cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                  window.location.href = "/";
                }}
              >
                Logout
              </span>
              {user.isAdmin ? (
                <Link to="/admin">
                  <span className="p-2 cursor-pointer">Admin</span>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
