import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 z-50 absolute w-full">
      <Link to="/">
        <img
          src="N_logo.svg"
          className="absolute w-[200px] h-[100px] top-0 left-4 z-[100] hover:cursor-pointer"
          ></img>
      </Link>
      <div className="text-white">
        <Link to="/signup">
          <button className=" pr-4 border border-transparent hover:border-white p-2 mr-2 transition-all duration-300">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="bg-red-600 px-6 py-2 rounded cursor-pointer hover:bg-red-700 transition-all duration-300">
           Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
