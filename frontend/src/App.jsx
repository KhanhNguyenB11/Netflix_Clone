import Home from './pages/Home.jsx'
import { Routes,Route,Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Watch from './pages/Watch.jsx'
import Admin from './pages/Admin.jsx'
import { useContext } from 'react'
import { AuthContext } from './context/authcontext/AuthContext.jsx'
import  MovieList  from './pages/MovieList.jsx'
function App() {
  const {user} = useContext(AuthContext);
  console.log(user);
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/admin" element={user&&user.isAdmin ? <Admin />: <Navigate to="/"/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path='/watch/:id' element={<Watch />}></Route>
        <Route path={user&&`/${user.username}/list`} element={<MovieList/>}></Route>
      </Routes>
    </div>
  )
}

export default App