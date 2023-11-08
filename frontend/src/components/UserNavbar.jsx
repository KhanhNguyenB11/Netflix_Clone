import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext/AuthContext.jsx";
import { logout } from "../context/authcontext/AuthAction.js";
const UserNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch, user } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div
      className={`navbar ${
        isScrolled
          ? "bg-main-color opacity-0 transition-all duration-300"
          : "bg-gradient-to-t from-transparent to-black via-main-color"
      } w-full text-white text-sm fixed top-0 z-50`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between h-16">
        <div className="gap-4 flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            className="h-6 mr-10 hidden md:block"
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks hidden md:block">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks hidden md:block">Movies</span>
          </Link>
          <span>New and Popular</span>
          <Link to={`/${user.username}/list`}>
            <span>My List</span>
          </Link>
        </div>
        <div className="gap-4 flex items-center mr-[50px]">
          <p className=" lg:text-xl md:text-lg sm:text-md">{user.username}</p>
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
