import { Link } from "react-router-dom";
function SignUp() {
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
              <h1 className="text-3xl font-bold">SignUp</h1>
              <form action="" className="w-full flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                />
                
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  SignUp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
