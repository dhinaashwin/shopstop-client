import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from 'react-router-dom';
import "./Hero.css";

const Hero = () => {
  
  const handleDragStart = (e) => e.preventDefault();

  return (
    <section className="hero-section mt-6">
 
        <AliceCarousel
          mouseTracking
          responsive={{ 0: { items: 1 } }}
          disableButtonsControls
          infinite
          controlsStrategy="none"
          className="custom-carousel"
          autoPlay 
          autoPlayInterval={4000}
        >
          <Link to='/NewCollections' className="flex justify-center">
          <img src="https://res.cloudinary.com/dhina11/image/upload/v1720000048/Hero_c2uytm.jpg" className="image-1-web p-5 " loading="lazy" />
          <img src="https://res.cloudinary.com/dhina11/image/upload/v1720000050/Hero-mobile_ijvjjz.jpg" className=" image-2-mobile p-5" loading="lazy" />
        </Link>
        <Link to='/Denim' className="flex justify-center">
        <img src="https://res.cloudinary.com/dhina11/image/upload/v1720000048/DenimBig_yxtzzs.jpg" className=" image-1-web p-5" loading="lazy" />
        <img src="https://res.cloudinary.com/dhina11/image/upload/v1720000049/DenimMobile_kvwa2r.jpg" className="image-2-mobile p-5" loading="lazy"/>
        </Link>
        </AliceCarousel>   
    </section>
  );
};

export default Hero;
