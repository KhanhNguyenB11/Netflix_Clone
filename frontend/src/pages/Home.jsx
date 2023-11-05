import Main from "../components/Main.jsx";
import Row from "../components/Row.jsx";
import Navbar from "../components/Navbar.jsx"
import request from "../Request.js";
function Home() {
  return (
    <div>
      <Navbar />
      <Main />
      {/* <Row title="Upcoming" rowID="1" fetchURL={request.requestUpcoming}/> */}
      <Row title="Poppular"  rowID="2" fetchURL={request.requestPopular}/>
      {/* <Row title="Top Rated" rowID="3" fetchURL={request.requestTopRated}/>
      <Row title="Trending" rowID="4" fetchURL={request.requestTrending}/> */}
    </div>
  );
}

export default Home;
