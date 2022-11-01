import { Routes, Route, BrowserRouter } from "react-router-dom" 
import Index from "@pages/Index/index.tsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
