import { useState } from "react";
import { Link } from "react-router-dom";
function SignUp() {
  const [email,setEmail] = useState();

  return (
    <>
      <Link to="/">
        <img
          src="N_logo.svg"
          className="absolute w-[200px] h-[100px] top-0 left-4 z-[100] hover:cursor-pointer"
        ></img>
      </Link>
      <div className="flex justify-center items-center w-full h-screen">
        <img src="login_background.jpg"
          alt="background_img"
          className="object-cover w-full h-full absolute"/>
          <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
          <div className="z-50 ">
          <div className=" text-center">
            <h1 className="text-white font-bold text-[3rem]">Unlimited movies, TV shows, and more</h1>
            <p className="text-white text-[1.5rem]">Watch anywhere. Cancel anytime.</p>
            <p className="text-white text-[1.5rem]">Ready to watch? Enter your email to create or restart your membership.</p>
          </div>
          <div className="flex justify-between items-center text-white">
            <div className=" rounded grow mr-3 my-3 border text-white border-white bg-gray-900/75">
            <input type="email" name="" id="" placeholder="Email address" className="py-5 px-4 w-full h-full bg-transparent"/>  
            </div>
          
          <button className="bg-red-600 py-5 rounded font-bold hover:bg-red-700 transition-all duration-300 px-5">Get Started</button>

          </div>
          </div>
      </div>
    </>
  );
}

export default SignUp;
