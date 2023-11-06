import axios from "axios";
import { loginStart, loginFailure, loginSuccess } from "./AuthAction";
import {API_URL} from "../../Request";
export const login = async (user,dispatch)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post(API_URL + "auth/login",user);
        dispatch(loginSuccess(res.data));
        window.location.href = '/';
    } catch (error) {
        console.log(error)
        dispatch(loginFailure())
    }
}