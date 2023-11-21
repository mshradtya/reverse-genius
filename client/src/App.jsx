import { Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chart from "./pages/Chart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<Chart />} />
      </Route>
    </Routes>
  );
}

export default App;
