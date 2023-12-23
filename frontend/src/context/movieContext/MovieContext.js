
import MovieReducer from "../movieContext/MovieReducer";
import {createContext, useEffect, useReducer} from "react";
const init_state = {
    movies: [],
    isFetching: false,
    error: false,
}
export const MovieContext = createContext(init_state);
export const MovieContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(MovieReducer,init_state);
    return(
        <MovieContext.Provider value={{user:state.movies,isFetching:state.isFetching,error:state.error, dispatch}}>
            {children}
        </MovieContext.Provider>
    )
}