import Main from "../components/Main.jsx";
import Row from "../components/Row.jsx";
import Navbar from "../components/Navbar.jsx";
import UserNavbar from "../components/UserNavbar.jsx";
import request from "../Request.js";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext/AuthContext.jsx";
function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-black"> 
      {user ? <UserNavbar /> : <Navbar />}
      <Main />
      {/* <Row title="Upcoming" rowID="1" fetchURL={request.requestUpcoming}/> */}
      <Row title="Poppular" rowID="2" fetchURL={request.requestPopular} />
      <Row title="Top Rated" rowID="3" fetchURL={request.requestTopRated} />
      <Row title="Drama" rowID="4" fetchURL={`${request.requestGenre}drama`} />
      <Row title="Action" rowID="5" fetchURL={`${request.requestGenre}action`}/>
    </div>
  );
}

export default Home;
