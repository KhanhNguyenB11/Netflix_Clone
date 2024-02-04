import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext/AuthContext";
import { login } from "../context/authcontext/apiCalls";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext);
  function handleLogin(e) {
    e.preventDefault();
    login({email,password},dispatch);
  }
  return (
    <>
      <Link to="/">
        <img
          src="N_logo.svg"
          className="absolute w-[200px] h-[100px] top-0 left-4 z-[100] hover:cursor-pointer"
        ></img>
      </Link>
      <div className="w-full h-screen">
        <img
          src="login_background.jpg"
          alt="background_img"
          className="object-cover w-full h-full absolute"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Login</h1>
              <form action="" className="w-full flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-700 transition-all duration-300"
                  onClick={(e) => {
                    handleLogin(e);
                  }}
                  
                >
                  Login
                </button>
                <div className="flex justify-between text-gray-500 ">
                  <p>
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </p>
                  <p>Need help?</p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      </div>
      
    </>
  );
}

export default Login;
