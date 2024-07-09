import React from 'react';
import './Footer.css'; // Import CSS file for styling

const Footer = () => {
  return (
  <section className='section-footer w-full bg-black text-white mt-10 z-10'>
    <div className="Parent-footer min-w-[320px] max-w-[1280px] m-auto flex md:justify-between px-3 pt-16 xsm:flex-col md:flex-row xsm:gap-5 ">
      <div>
        <ul className='flex flex-col gap-6'>
          <h2 className='font-sb'>SNITCH CLUB</h2>
          <li>Know Us</li>
        </ul>
      </div>
      <div>
        <ul className='flex flex-col gap-6'>
          <h2 className='font-sb'>Shop</h2>
          <li>Men</li>
          <li>Men</li>
        </ul>
      </div>
      <div >
        <ul className='flex flex-col gap-6'>
         <h2>Help</h2>
         <li>Terms & Conditions</li>
         <li>Return/Exchange</li>
         <li>Privacy policy</li>
         <li>Shipping policy</li>
         <li>Refund policy</li>
         <li>Contact information</li>
         <li>Track order</li>
        </ul>
      </div>
    </div>
  </section>
  )
}

export default Footer
