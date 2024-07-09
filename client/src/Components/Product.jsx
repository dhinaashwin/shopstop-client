import React, { useContext, useState } from 'react';
import { Context } from '../Context/Context';
import { CartContext } from '../Context/CartContext';
import { Link, useParams } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; // Import the CSS for styling
import './Product.css';
import ZoomComponent from '../Animations/ZoomComponent';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Product = () => {
  const { productsdata, loading, error } = useContext(Context);
  const { addToCart } = useContext(CartContext); // Use CartContext
  const { productId } = useParams();
  const [size, setSize] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State for modal
  const [selectedImage, setSelectedImage] = useState(''); // State for selected image in modal
  const[webimage,setWebImage]=useState('main_image')

  if (loading) return <p>Loading...</p>; // Display loading message

  if (error) return <p>Error: {error.message}</p>;

  // Find the product based on productId
  const product = productsdata.find((product) => product.id === productId);

  if (!product) return <p>Product not found</p>;

  // Calculate percentage off
  const calculatePercentageOff = () => {
    const oldPrice = parseFloat(product.old_price);
    const newPrice = parseFloat(product.new_price);

    if (oldPrice && newPrice && oldPrice > newPrice) {
      const percentageOff = ((oldPrice - newPrice) / oldPrice) * 100;
      return `${percentageOff.toFixed(0)}% OFF`;
    }

    return '';
  };
  const handleAddToCart = () => {
    if (!size) {
      alert('Please select a size to proceed');
      return;
    }
    addToCart(product, size);
    alert('Product Added')
  };
  // Toggle zoom modal
  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Render sizes if available
  const renderSizes = () => {
    return Object.entries(product.sizes).map(([sizeOption, count]) => {
      if (count > 0) {
        return (
          <div key={sizeOption} className="size">
            <p
              className={`text-[21px] size-p ${size === sizeOption ? 'selected-size' : ''}`}
              onClick={() => setSize(sizeOption)}
            >
              {sizeOption}
            </p>
          </div>
        );
      }
      return null;
    });
  };

  // Render colors split by comma
  const renderColors = () => {
    if (product.color) {
      const colors = product.color.split(',').map((color, index) => (
        <div key={index} className="capitalize color-span w-6 h-6" style={{ background: color }}>
          {index < product.color.split(',').length - 1 && ''}
        </div>
      ));
      return <>{colors}</>;
    }
    return null;
  };

  // Find related products based on category
  // productsdata.filter(p => p.category === product.category && p.id !== product.id);
  const relatedProducts = productsdata;
  const relatedItems = relatedProducts.map((relatedProduct, index) => (
    <div className="flex justify-center px-2" key={index}>
      <Link to={`/product/${relatedProduct.id}`} className="related-item flex flex-col items-center w-[100%] md:px-10">
        <img src={relatedProduct.main_image} alt={relatedProduct.name}  className=" related-image h-auto" />
        <div className="text-center mt-2">
          <p className="md:text-[16px] sm:text-[12px]">{relatedProduct.name}</p>
          <p className="md:text-[16px] sm:text-[12px] text-gray-600">Rs {relatedProduct.new_price}</p>
        </div>
      </Link>
    </div>
  ));

  return (
    <section className="">
      <div className="w-full justify-center flex sm:flex-col md:flex-row md:gap-7 md:px-2 relative">
        <div className="images w-full h-auto flex justify-center mt-1 md:w-[60%] ">
          <div className=" gap-6 sm:hidden md:flex">
          <div className="flex flex-col justify-around w-[60px]">
            {['main_image', 'image_2', 'image_3', 'image_4'].map((img) => (
              <div key={img} onClick={() => setWebImage(img) }>
                <img src={product[img]} alt={img}></img>
              </div>
            ))}
          </div>
          <div className="w-[400px] flex items-center justify-center">
            <img src={product[webimage]}></img>
          </div>
          </div>
          <div className="sm:flex items-center justify-center md:hidden">
           <div>
           <AliceCarousel
              mouseTracking
              disableButtonsControls
              controlsStrategy="none"
              responsive={{
                0: { items: 1 },
                600: { items: 1 },
                1024: { items: 1 },
              }}
              items={[
                <motion.div
                  whileTap={{ scale: 0.9 }} // Zoom effect on click
                  className="alice-carousel__stage-item"
                  onClick={() => openModal(product.main_image)}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  key="main_image"
                >
                  <motion.img
                    src={product.main_image}
                    alt={product.name}
                  />
                </motion.div>,
                <motion.div
                  whileTap={{ scale: 0.9 }} // Zoom effect on click
                  className="alice-carousel__stage-item"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  onClick={() => openModal(product.image_2)}
                  key="image_2"
                >
                  <motion.img
                    src={product.image_2}
                    alt={product.name}
                  />
                </motion.div>,
                <motion.div
                  whileTap={{ scale: 0.9 }} // Zoom effect on click
                  className="alice-carousel__stage-item"
                  onClick={() => openModal(product.image_3)}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  key="image_3"
                >
                  <motion.img
                    src={product.image_3}
                    alt={product.name}
                  />
                </motion.div>,
                <motion.div
                  whileHover={{ scale: 1.1 }} // Zoom effect on hover
                  whileTap={{ scale: 0.9 }} // Zoom effect on click
                  className="alice-carousel__stage-item"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  onClick={() => openModal(product.image_4)}
                  key="image_4"
                >
                  <motion.img
                    src={product.image_4}
                    alt={product.name}
                  />
                </motion.div>,
              ]}
            />
           </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col mb-8 md:w-[40%]">
          <div className='flex flex-col'>
            <div className='flex flex-col sm:items-center md:items-start'>
              <p className="sm:text-[10px] md:text-[14px]">ShopStop</p>
              <h1 className="sm:text-[19px] md:text-[24px] font-sb">{product.name}</h1>
            </div>

            <div className="flex gap-4 mt-1 items-center sm:justify-center md:justify-start">
              <p className="sm:text-[21px] md:text-[26px] font-bold">
                <span className="pr-1">Rs</span>
                {product.new_price}
              </p>
              <p className="sm:text-[21px] md:text-[26px] line-through opacity-70">
                <span className="pr-1">Rs</span>
                {product.old_price}
              </p>
              <p className="sm:text-[18px] md:text-[24px] off text-green-600">{calculatePercentageOff()}</p>
            </div>
            <div className="sm:justify-center sm:pr-[8.5rem] md:justify-start flex">
              <p className="sm:text-[10px] md:text-[14px] opacity-80 tax">Incl Of All Taxes</p>
            </div>

            <div className="sizes md:px-0 flex gap-10 mt-4 sm:justify-center md:justify-start">
              {renderSizes()}
            </div>
            <div 
            className="bg-black text-white w-fit items-center text-[26px] px-2 mt-3 sm:hidden md:flex"
            onClick={() => addToCart(product, size)} // Add to cart on click
          >
            ADD TO CART 
          </div>
            <div className='mt-5 sm:pl-4 md:pl-0'>
              <div className="flex justify-start gap-4">
                Color: {renderColors()}
              </div>
              <div className="mt-1">
                Fit: {product.fit}
              </div>
            </div>

            <div className="flex sm:pl-4 md:pl-0 mt-3 flex-col">
              <span className="font-sb">
                Description
              </span> 
              <p className="tax pr-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa amet voluptatibus mollitia ad. Maxime non, a obcaecati rem distinctio labore optio voluptas, quod qui atque cupiditate numquam, illum dolore ipsa?
              </p>
            </div>
          </div>
          <div 
            className="bg-black text-white w-full flex items-center justify-center fixed bottom-0 text-[26px] h-[60px] z-50 md:hidden"
            onClick={ () => handleAddToCart()} // Add to cart on click
          >
            ADD TO CART 
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products flex flex-col items-center justify-center sm:mt-8 md:mt-20">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <AliceCarousel
          mouseTracking
          items={relatedItems}
          infinite
          disableButtonsControls
          controlsStrategy="none"
          responsive={{
            0: { items: 2 },
            600: { items: 3 },
            1024: { items: 3 },
          }}
        />
      </div>

      {/* Zoom Modal */}
      <ZoomComponent isOpen={isOpen} selectedImage={selectedImage} closeModal={closeModal} />
    </section>
  );
};

export default Product;
