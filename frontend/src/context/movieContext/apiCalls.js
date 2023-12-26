import axios from "axios";
import {
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./MovieAction";
import { API_URL } from "../../Request";
//getallMovies
export const GetMovies = async (dispatch,user) => {
  dispatch(getMoviesStart());
  await axios
    .get(`${API_URL}movies`, {
      headers: {
        token: `bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      dispatch(getMoviesSuccess(res.data));
      console.log(res.data);
    })
    .catch((error) => {
      dispatch(getMoviesFailure());
      console.log(error);
    });
};
//delete movie
export const deleteMovie = async (id,dispatch,user) => {
  dispatch(deleteMovieStart());
  await axios
    .delete(`${API_URL}movies/${id}`, {
      headers: {
        token: `bearer ${user.accessToken}`,
      },
    })
    .then((res) => {
      dispatch(deleteMovieSuccess(id));
      console.log(res);
    })
    .catch((error) => {
      dispatch(deleteMovieFailure())
      console.log(error);
    });

}
