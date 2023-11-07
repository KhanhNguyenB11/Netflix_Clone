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
    <div>
      {user ? <UserNavbar /> : <Navbar />}
      <Main />
      {/* <Row title="Upcoming" rowID="1" fetchURL={request.requestUpcoming}/> */}
      <Row title="Poppular" rowID="2" fetchURL={request.requestPopular} />
      <Row title="Top Rated" rowID="3" fetchURL={request.requestTopRated} />
      <Row title="Horror" rowID="4" fetchURL={request.requestHorror} />
      {/* <Row title="Trending" rowID="4" fetchURL={request.requestTrending}/> */}
    </div>
  );
}

export default Home;
