import Sidebar from "../../../admin/src/components/sidebar/Sidebar";
import Topbar from "../../../admin/src/components/topbar/Topbar";
import "../../../admin/src/App.css";
import AdminHome from "../../../admin/src/pages/home/AdminHome";
import { Outlet } from "react-router-dom";
function Admin() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Admin;
