import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cart, addToCart ,removeFromCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);

  // Function to calculate total amount in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.new_price, 0);
  };

  // // Function to handle the checkout process
  // const handleProceedToCheckout = async () => {
  //   try {
  //     const checkoutEndpoint = 'http://localhost:3001/checkout';
  //     const checkoutData = {
  //       cartItems: cart,
  //       totalAmount: calculateTotal(),
  //       userEmail: currentUser.email,
  //     };

  //     const response = await axios.post(checkoutEndpoint, checkoutData);
  //     console.log('Checkout Response:', response.data);

  //     // Optionally, clear cart state after successful checkout
  //     // clearCart(); // Implement clearCart if needed
  //     console.log('Proceeding to checkout...');
  //   } catch (error) {
  //     console.error('Checkout Failed:', error);
  //     // Handle error
  //   }
  // };

  return (
    <div className="cart-container w-full h-auto flex flex-col items-center p-5">
      <h2 className="text-2xl font-semibold mb-5">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-3xl">
          {cart.map((item, index) => (
            <div key={index} className="cart-item flex md:flex-row gap-5 bg-gray-100 rounded-lg shadow-md mb-5 p-5">
              <div className="w-full md:w-1/4 flex justify-center">
                <img src={item.main_image} alt={item.name} className="cart-item-image object-cover rounded-md" />
              </div>
              <div className="cart-item-details w-full md:w-3/4 flex flex-col justify-between">
                <div>
                  <p className="text-l font-semibold">{item.name}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Price: Rs {item.new_price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)} // Pass productId and size here
                  className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary mt-5 flex flex-col items-center">
            <div className="cart-total text-xl font-semibold mb-5">
              <h3>Total: Rs {calculateTotal()}</h3>
            </div>
            <button
              // onClick={handleProceedToCheckout}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
