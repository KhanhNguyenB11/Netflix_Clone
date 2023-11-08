import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext/AuthContext";
import { API_URL } from "../Request";
import UserNavbar from "../components/UserNavbar";
import ListCard from "../components/ListCard";
function MovieList() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const config = {
      headers: {
        token: "bearer " + user.accessToken,
      },
    };
    axios
      .get(API_URL + `users/${user._id}/lists`, config)
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  return (
    <>
    <div className="text-white">
      <h1 className="text-white xl:text-3xl py-5 mt-10">My Lists</h1>
      <div className="grid grid-cols-3 gap-4 px-32">
        {list
          ? list.map((item) => <ListCard key={item._id} list={item} />)
          :""}
      </div>
    </div>
    </>
  );
}

export default MovieList;
