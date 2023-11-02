import Home from './pages/Home.jsx'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        
      </Routes>
    </div>
  )
}

export default App