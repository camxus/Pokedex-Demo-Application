import { Routes, Route, BrowserRouter } from "react-router-dom" 
import Login from "@pages/Auth/Login/index.tsx"
import Home from "@pages/Home/index.tsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
