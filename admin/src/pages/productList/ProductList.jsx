import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MovieContext } from "../../../../frontend/src/context/movieContext/MovieContext";
import { useEffect } from "react";
import { useContext } from "react";
import { GetMovies, deleteMovie } from "../../../../frontend/src/context/movieContext/apiCalls";
import { AuthContext } from "../../../../frontend/src/context/authcontext/AuthContext";
export default function ProductList() {
  const { user } = useContext(AuthContext);
  const {movies,dispatch} = useContext(MovieContext);
  useEffect(() => {
    let ignore = false;
    if(!ignore){
      GetMovies(dispatch,user);
    }
    return () => {
      ignore = true;
    }
  },[])
  const handleDelete = (id) => {
    deleteMovie(id,dispatch,user)
  };  

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.title}
          </div>
        );
      },
    },
    { field: "popularity", headerName: "Popularity", width: 170 },
    { field: "release_date", headerName: "Release date", width: 170 },
    { field: "vote_average", headerName: "Vote Average", width: 170 },
    { field: "vote_count", headerName: "Vote Count", width: 170 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
         <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
