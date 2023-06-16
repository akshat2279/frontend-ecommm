import  { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./state/store";

import Auth from "./components/authcomponents/Auth";
import Login from "./components/authcomponents/Login";
import Home from "./components/usercomponents/Home";
import Product from "./components/admincomponents/product/Product";
import Dashboard from "./components/admincomponents/admindashboard/Dashboard";
import Productpage from "./components/admincomponents/product/Productpage";
import Cart from "./components/usercomponents/Cart";
import Profile from "./components/usercomponents/Profile";
import Address from "./components/usercomponents/Address";

import "./App.css";

function App() {
  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData  = localStorage.getItem("userdata")
    const user =userData? JSON.parse(userData || ""):{}
    const isAdminValue = user?.isAdmin;

    setIsAdmin(isAdminValue);
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer autoClose={1000} pauseOnFocusLoss={false} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/login" element={<Login />} />

            {isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
            {isAdmin && <Route path="/products" element={<Productpage />} />}
            {isAdmin && <Route path="/product" element={<Product />} />}

            {!isAdmin && <Route path="/home" element={<Home />} />}
            {!isAdmin && <Route path="/cart" element={<Cart />} />}
            {!isAdmin && <Route path="/profile" element={<Profile />} />}
            {!isAdmin && <Route path="/address" element={<Address />} />}
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
