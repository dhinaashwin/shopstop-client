import React from 'react'
import NavBar from '../Components/NavBar'
import Hero from '../Components/Hero/Hero'
import Footer from '../Components/Footer'
import Category from '../Components/Category/Category'
import FilterHome from '../Components/FilterHome/FilterHome'
import Trending from '../Components/Trending'

const Homepage = () => {
  return (
    <>
    {/* <Category/> */}
    <Hero/>
    <FilterHome/>
    <Trending/>
    <div className='pt-12 px-12'>
     <img src='https://res.cloudinary.com/dhina11/image/upload/v1720434875/Sale2_pf5zmj.jpg' className="w-full m-auto object-contain" alt="" srcset="" />
   </div> 
    </>
    
  )
}

export default Homepage