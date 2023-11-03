import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 z-50 absolute w-full">
      <Link to="/">
        {/* <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1> */}
        <img
          src="N_logo.svg"
          className="absolute w-[200px] h-[100px] top-0 left-4 z-[100] hover:cursor-pointer"
          ></img>
      </Link>
      <div>
        <Link to="/login">
          <button className="text-white pr-4">Sign In</button>
        </Link>
        <Link to="signup">
          <button className="bg-red-600 px-6 py-2 rounded cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
