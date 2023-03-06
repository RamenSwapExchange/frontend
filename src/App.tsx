import "./index.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tokens from "./components/Tokens/Tokens";
import Swap from "./components/Swap/Swap";
import Pool from "./components/Pool/Pool";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>

      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Swap />}></Route>
          <Route path="/tokens" element={<Tokens />}></Route>
          <Route path="/pool" element={<Pool />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
