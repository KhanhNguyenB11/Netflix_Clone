import axios from "axios";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../Request";
import { login } from "../context/authcontext/apiCalls";
import { AuthContext } from "../context/authcontext/AuthContext";
import Loading from "../components/Loading";
function SignUp() {
  const [email, setEmail] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const [submitedEmail, setSubmitedEmail] = useState(false);
  const [displayEmailError, setDisplayEmailError] = useState({
    display: false,
    msg: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [loading, setLoading] = useState(false);
  function handleChangeEmail() {
    setSubmitedEmail(false);
  }
  async function handleSubmitEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setLoading(true);
      await axios
        .get(`${API_URL}auth/emailused?email=${email}`)
        .then((res) => {
          if (res.data.used) {
            setDisplayEmailError({
              display: true,
              msg: "Email Already Used! Please Try Again!",
            });
            setSubmitedEmail(false);
          } else {
            setDisplayEmailError({ display: false });
            setSubmitedEmail(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
        setLoading(false);
    } else {
      setDisplayEmailError({
        display: true,
        msg: "Invalid Email! Please Try Again!",
      });
      setSubmitedEmail(false);
    }
  }
  function validation() {
    if (password.length === 0) {
      return false;
    }
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }
  async function handleSignUp(e) {
    setLoading(true)
    e.preventDefault();
    if (validation() === true) {
      await axios
        .post(`${API_URL}auth/register`, {
          username: email.split("@")[0],
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            login({ email, password }, dispatch);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPwdError(true);
    }
    setLoading(false)
  }
  return (
    <>
      <Link to="/">
        <img
          src="N_logo.svg"
          className="absolute w-[200px] h-[100px] top-0 left-4 z-[100] hover:cursor-pointer"
        ></img>
      </Link>
      <div className="flex justify-center items-center w-full h-screen">
        <img
          src="login_background.jpg"
          alt="background_img"
          className="object-cover w-full h-full absolute"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        {!submitedEmail && (
          <div className="z-50 ">
            <div className=" text-center">
              <h1 className="text-white font-bold text-[3rem]">
                Unlimited movies, TV shows, and more
              </h1>
              <p className="text-white text-[1.5rem]">
                Watch anywhere. Cancel anytime.
              </p>
              <p className="text-white text-[1.5rem]">
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
            </div>
            <div className="flex justify-between items-center text-white px-3">
              <div className="grow mr-3 my-3 ">
                <div className=" rounded w-full border text-white border-white bg-gray-900/75">
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Email address"
                    className="py-5 px-4 w-full h-full bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="bg-red-600  rounded font-bold hover:bg-red-700 transition-all duration-300 p-5"
                onClick={handleSubmitEmail}
                disabled={loading}
              >
                {loading ?<Loading small={true}></Loading> :"Get Started"}
              </button>
            </div>
            {displayEmailError.display && (
              <h2 className="text-red-600 p-2 ">{displayEmailError.msg}</h2>
            )}
          </div>
        )}

        {submitedEmail ? (
          <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[500px] mx-auto bg-black/75 text-white z-50">
              <div className="max-w-[320px] mx-auto py-16">
                <h1 className="text-3xl font-bold">Sign Up</h1>

                <form action="" className="w-full flex flex-col py-4">
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {pwdError && (
                    <p className="text-red-600">Password does not match !</p>
                  )}

                  <button
                    className="bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-700 transition-all duration-300 flex justify-center"
                    type="button"
                    onClick={handleSignUp}
                    disabled={loading}
                  >{loading ? <Loading className="" small={true}></Loading> : "Sign Up"} 
                  </button>
                  <div className="flex justify-between text-gray-500 ">
                    <p
                      className="underline cursor-pointer"
                      onClick={handleChangeEmail}
                    >
                      Change your email{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default SignUp;
