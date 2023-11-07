import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authcontext/AuthContext";
import { API_URL } from "../Request";
function MovieList() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        "token": "bearer " + user.accessToken,
      },
    };
    axios
      .get(API_URL + `users/${user._id}/lists`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return <div>MovieList</div>;
}

export default MovieList;
