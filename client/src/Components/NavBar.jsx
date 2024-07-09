// src/Components/NavBar.js
import React, { useState, useContext, useEffect } from 'react';
import { FaListUl } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context'; // Adjust the path as needed
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext'; // Import the AuthContext

const NavBar = () => {
  const { productsdata } = useContext(Context);
  const { cart } = useContext(CartContext); // Use cart from CartContext
  const { currentUser, signOut } = useContext(AuthContext); // Use currentUser and signOut function from AuthContext
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleToggle1 = () => {
    setIsMenuOpen(prevState => !prevState);
   
  };
  const handleToggle2 = () =>{
    setIsMenuOpen2(prevState => !prevState);
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(prevState => !prevState);
    setSearchQuery(''); // Reset search query when toggling the search bar
    setFilteredItems([]); // Reset filtered items
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems([]);
    } else {
      const results = productsdata.filter(item =>
        Object.entries(item).some(([key, value]) =>
          key.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
      setFilteredItems(results);
    }
  }, [searchQuery, productsdata]);

  const handleSignOut = () => {
    signOut(); // Call the signOut function from AuthContext
  };

  return (
    <section className="navbar bg-[#fffefb] py-4 shadow-md w-[100vw]">
      <div className="flex max-w-[1280px] justify-between items-center mx-auto px-4">
        <div className="flex items-center space-x-4">
          {isMenuOpen ? (
            <MdOutlineCancel className="text-5xl cursor-pointer" onClick={handleToggle1} />
          ) : (
            <FaListUl className="text-4xl cursor-pointer" onClick={handleToggle1} />
          )}
        </div>
        <div className="text-2xl font-bold">
          ShopStop
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <IoSearchOutline className="text-2xl cursor-pointer" onClick={handleSearchToggle} />
            {isSearchOpen && (
              <div className="absolute -top-7 md:-left-80 sm:-left-40 mt-2 p-2 border border-gray-300 rounded bg-white md:w-[300px] sm:w-[150px] z-10">
                <input 
                  type="text" 
                  className="p-2 border border-gray-300 rounded w-full" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {filteredItems.length > 0 && (
                  <ul className="mt-2 max-h-60 overflow-y-auto">
                    {filteredItems.map(item => (
                      <li key={item.id} className="p-2 border-b border-gray-200 cursor-pointer">
                        <Link to={`/product/${item.id}`} onClick={handleSearchToggle}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <Link to='/cart' className="relative">
            <FaCartShopping className="text-2xl cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          {currentUser ? (
            <div className="relative">
              <img
                src={currentUser.photoURL}
                alt=""
                className="w-[40px] h-[40px] rounded-full cursor-pointer"
                onClick={handleToggle2} // Toggle dropdown on image click
              />
              {isMenuOpen2 && (
                <ul className="absolute right-0 mt-2 bg-white rounded border border-gray-300 p-2">
                  <li className="cursor-pointer" onClick={handleSignOut}>Sign Out</li>
                </ul>
              )}
            </div>
          ) : (
            <Link to = '/login'>
            <img
            src="" // Replace with your dummy image path
            alt="Dummy"
            className="w-[40px] h-[40px] rounded-full"
          />
            </Link>
          
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex mt-4 absolute bg-white w-[50%] h-full z-50">
          <ul className="flex flex-col gap-10 absolute left-[20%] h-fit">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Men</li>
            <li className="cursor-pointer">Women</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default NavBar;
