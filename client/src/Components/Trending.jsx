import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Trending.css'
const Trending = () => {
    const datas =[
        {
            id:1,
            image:'https://res.cloudinary.com/dhina11/image/upload/v1720434872/LinenShirt_nbsi9b.jpg',
            title:'BREZZY LINEN',
            link:'fabric/linen',
            name:"linen"
        },
        {
            id:2,
            image:'https://res.cloudinary.com/dhina11/image/upload/v1720434872/PoloTshirt_moxo4h.jpg',
            title:'POLOS',
            link:'fabric/polo',
            name:"polo"
        },{
            id:3,
            image:'https://res.cloudinary.com/dhina11/image/upload/v1720434872/SummerShirt_kpfaua.jpg',
            title:'SUMMER LOVE',
            link:'fabric/rayon',
            name:"summer"
        },
        {
            id:4,
            image:'https://res.cloudinary.com/dhina11/image/upload/v1720434872/PartyWearShirt_f3siq8.jpg',
            title:'PARTY HARD',
            link:'fabric/partywear',
            name:'party'
        },
    ]
  return (
    <section className='trending mt-12 flex flex-col items-center px-8'>
        <div>
           <h1 className='font-b text-[34px]'>TRENDING NOW</h1> 
        </div>
   <div className="grid md:grid-cols-4 sm:grid-cols-2 mt-6">
    {
        datas.map((data) => (
            <Link to={data.link} key={data.id} className='md:p-2 sm:p-[14px] relative parent '>
                <img src={data.image} className='svg-ds-2'></img>
                <h2 className='absolute md:text-[32px] sm:text-[24px] font-sb'>{data.title}</h2>
            </Link>
            
        ))
    }
    </div>  
      </section>
  )
}

export default Trending