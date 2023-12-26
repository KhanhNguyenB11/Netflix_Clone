import Sidebar from "../../../admin/src/components/sidebar/Sidebar";
import Topbar from "../../../admin/src/components/topbar/Topbar";
import "../../../admin/src/App.css";
import { Outlet } from "react-router-dom";
import { MovieContextProvider } from "../context/movieContext/MovieContext";
function Admin() {
  return (
    <>
      <MovieContextProvider>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Outlet />
        </div>
      </MovieContextProvider>
    </>
  );
}

export default Admin;
