import AuthReducer from "./authReducer";
import {createContext, useEffect, useReducer} from "react";
const init_state = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
}
export const AuthContext = createContext(init_state);
export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,init_state);
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
    return(
        <AuthContext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}