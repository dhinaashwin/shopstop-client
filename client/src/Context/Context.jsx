import React, { createContext, useEffect, useState } from 'react';

// Create a context
const Context = createContext();

const Provider = ({ children }) => {
  const [productsdata, setProductsdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/items'); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsdata(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Context.Provider value={{ productsdata, loading, error }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };

