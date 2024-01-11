import Home from "./pages/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Watch from "./pages/Watch.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authcontext/AuthContext.jsx";
import MovieList from "./pages/MovieList.jsx";
import ListDetail from "./pages/ListDetail.jsx";
import Admin from "./pages/Admin.jsx";
import "../../admin/src/App.css";
import AdminHome from "../../admin/src/pages/home/AdminHome";
import UserList from "../../admin/src/pages/userList/UserList";
import User from "../../admin/src/pages/user/User";
import NewUser from "../../admin/src/pages/newUser/NewUser";
import ProductList from "../../admin/src/pages/productList/ProductList";
import Product from "../../admin/src/pages/product/Product";
import NewProduct from "../../admin/src/pages/newProduct/NewProduct";
import Search from "./pages/Search.jsx";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search/:title" element={<Search />}></Route>
        <Route
          path="/admin"
          element={user && user.isAdmin ? <Admin /> : <Navigate to="/" />}
        >

          <Route>
            <Route path="" element={<AdminHome />}></Route>
            <Route path="users" element={<UserList />}></Route>
            <Route path="user/:userId" element={<User />}></Route>
            <Route path="newUser" element={<NewUser />}></Route>
            <Route path="movie" element={<ProductList />}></Route>
            <Route
              path="movie/:movieId"
              element={<Product />}
            ></Route>
            <Route path="newmovie" element={<NewProduct />}></Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/watch/:id" element={<Watch />}></Route>
        <Route
          path={user && `/${user.username}/list`}
          element={<MovieList />}
        ></Route>
        <Route
          path={user && `/${user.username}/list/:listname`}
          element={<ListDetail />}
        />
      </Routes>
    </div>
  );
}

export default App;
