import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Tokens from "./components/Tokens/Tokens";
import Swap from "./components/Swap/Swap";
import Pools from "./components/Pools/Pools";
import Header from "./components/Header/Header";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { fetchAsyncNetworks } from "./redux/appSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncNetworks());
  }, [dispatch]);

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/swap" />} />
        <Route path="/swap" element={<Swap />}></Route>
        <Route path="/tokens" element={<Tokens />}></Route>
        <Route path="/pools" element={<Pools />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
