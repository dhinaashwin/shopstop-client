import React from 'react';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Category.css';

const Category = () => {
  const categories = [
    { name: "Shirts", image:'https://firebasestorage.googleapis.com/v0/b/fir-c4fa9.appspot.com/o/files%2FShirts.png?alt=media&token=a3b61b2c-2d38-4fb9-bfd9-b4b118a4cad6', type: "Shirt" },
    { name: "Trousers",image:'https://firebasestorage.googleapis.com/v0/b/fir-c4fa9.appspot.com/o/files%2FBottoms.png?alt=media&token=0c5ead2c-b32f-4032-9d65-47d5a98aa1c0' , type: "Trousers" },
    { name: "TShirts",image:'https://firebasestorage.googleapis.com/v0/b/fir-c4fa9.appspot.com/o/files%2FTShirts.png?alt=media&token=ca1b46ae-0c9c-41e5-9de2-6b56b4f7ac25' , type: "TShirt" },
    { name: "Shoes", image:'https://firebasestorage.googleapis.com/v0/b/fir-c4fa9.appspot.com/o/files%2FShoes.png?alt=media&token=5934714c-23ef-40d7-bc28-ce153f7a790e', type: "Shoe" },
    { name: "Jeans",image:'https://firebasestorage.googleapis.com/v0/b/fir-c4fa9.appspot.com/o/files%2FBottoms.png?alt=media&token=0c5ead2c-b32f-4032-9d65-47d5a98aa1c0' , type: "Jeans" }
  ];

  const responsive = {
    0: { items: 4 },
    568: { items: 4 },
    1024: { items: 6 },
  };

  return (
    <div className='w-full mt-28 flex justify-center'>
      <AliceCarousel
        mouseTracking
        responsive={responsive}
        disableButtonsControls

        controlsStrategy="none"

      >
        {categories.map((type, index) => (
          <div key={index} className='Category flex md:px-12'>
            <Link to={`${type.type}`}>
              <img src={type.image} alt={type.name} className='xsm:w-[150px] md:w-[170px] h-fit' />
            </Link>
          </div>
        ))}
      </AliceCarousel>
    </div>
  );
};

export default Category;