// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import Item from './Components/Item/Item';
import Cart from './Components/Cart/Cart';
import { Provider } from './Context/Context';
import './App.css'; // Ensure Tailwind CSS is set up correctly
import Product from './Components/Product';
import ScrollToTop from './Animations/ScrollToTop';
import Login from './Components/Login/Login';
import CartProvider from './Context/CartContext'; // Correct import
import Footer from './Components/Footer';
import CategoryFilterProducts from './Components/AllProducts/CategoryFilterProducts';
import GenderFilterProducts from './Components/AllProducts/GenderFilterProducts';
import FabricFilterProducts from './Components/AllProducts/FabricFilterProducts';
import AuthProvider from './Context/AuthContext';

function App() {
  const categorytypes = ['shirt', 'tshirt', 'trouser', 'jean'];
  const gendertypes = ['men','women','unisex'];
  const fabrictypes =['cotton','corduroy','linen'];

  return (
    <BrowserRouter>
      <Provider>
        <CartProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col items-center">
              <div className="container-1 flex items-center flex-col max-w-[1280px] min-w-[320px] bg-[#fffefb] border-r-green-600">
                <ScrollToTop />
                <NavBar />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Homepage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/items" element={<Item />} />
                  {categorytypes.map(type => (
                    <Route key={type} path={`category/${type}`} element={<CategoryFilterProducts title={type} type={type} />} />
                  ))}
                  {gendertypes.map(type => (
                    <Route key={type} path={`gender/${type}`} element={<GenderFilterProducts title={type} type={type} />} />
                  ))}
                  {fabrictypes.map(type => (
                    <Route key={type} path={`fabric/${type}`} element={<FabricFilterProducts title={type} type={type} />} />
                  ))}
                  <Route path="/product/:productId" element={<Product />} />
                </Routes>
              </div>
              <div className="w-full">
                <Footer />
              </div>
            </div>
          </AuthProvider>
        </CartProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
