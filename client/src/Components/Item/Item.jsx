import React, { useState, useEffect } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Item = ({ item }) => {
  const [currentImage, setCurrentImage] = useState(item.main_image);

  // Assuming image_2 and main_image are defined somewhere else in your context or props

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    let intervalId;
    let timeoutId;

    if (viewportWidth <= 480) {
      intervalId = setInterval(() => {
        setCurrentImage(prevImage => (prevImage === item.main_image ? item.image_2 : item.main_image));
      }, 400); // Change images every 400 milliseconds

      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 2000); // Disable automatic image change after 2 seconds
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [item.main_image, item.image_2]);

  return (
    <section className="item-section">
          <Link to={`/product/${item.id}`} className='flex flex-col px-2 gap-1 items-center' key={item.id}>
      <motion.img
        src={currentImage}
        className='w-[350px]'
        alt=''
        whileHover={{ scale: 1.01 }} // Scale animation on hover
        onMouseEnter={() => setCurrentImage(item.image_2)} // Change image on mouse enter
        onMouseLeave={() => setCurrentImage(item.main_image)} // Change back to main image on mouse leave
      />
      <p className="pl-1 font-sb text-center">{item.name.toUpperCase()}</p>
      <div className="flex gap-4 ">
        <p className='sm:text-[12px]'>RS {item.new_price}</p>
      </div>
      
      {/* Example of rendering sizes if they are available */}
      {item.sizes && (
        <div>
          <ul className="flex gap-4 opacity-60">
            {Object.entries(item.sizes).map(([size, quantity]) => (
              quantity !== 0 && <li key={size}>{size.toUpperCase()}</li>
            ))}
          </ul>
        </div>
      )}
    </Link>
    </section>

  );
};

export default Item;
