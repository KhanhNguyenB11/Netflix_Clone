import Main from "../components/Main.jsx";
import Row from "../components/Row.jsx";
import request from "../Request.js";
function Home() {
  return (
    <div>
      <Main />
      <Row title="Upcoming" fetchURL={request.requestUpcoming}/>
    </div>
  );
}

export default Home;
