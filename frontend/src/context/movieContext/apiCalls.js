import axios from "axios";
import { getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieAction"
import { API_URL } from "../../Request";
const { user } = useContext(AuthContext);
export const getMovies = async (dispatch) =>{
    getMoviesStart();
    axios.get(`${API_URL}movies`,{
        headers:{
            token: `bearer ${user.accessToken}`,
        }
    })
    .then(res=>{
        dispatch(getMoviesSuccess(res.data))
    })
    .catch(error=>{
        dispatch(getMoviesFailure());
        console.log(error);
    })
}