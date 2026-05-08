import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import ClassifySnake from "./pages/ClassifySnake";
import About from "./pages/About";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ClassifySnake />} />
      
        <Route path="/about" element={<About />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;