import React, { useEffect } from 'react'
import Layout from '../layout/Layout'
import ProductCard from '../components/ProductCard'
import SingleProduct from '../components/SingleProduct'
import Cart from './Cart'
import img  from '../assets/react.svg'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import ProCard from './ProCard'
import Banner from '../components/Banner'
import gsap from 'gsap'

function Home() {
  
  return (
    <>
    <Layout>

   <Banner/>
      {/* <ProductCard/> */}
      <div   className='bg-black scroll-container whitespace-nowrap items-center h-32 flex justify-center   overflow-hidden '>
          <div className='sc      '>

          <span className='text-white text-5xl scroller capitalize font-bold'>❁  Mens </span>
              <span className='text-green-800 text-5xl scroller capitalize font-bold'>❁  Women </span>
              <span className='text-white text-5xl scroller capitalize font-bold'>❁  Accessories </span>
              <span className='text-green-800 text-5xl scroller capitalize font-bold'>❁  Kids </span>
              <span className='text-white text-5xl scroller capitalize font-bold'>❁  fashions </span>
              <span className='text-green-800 text-5xl scroller capitalize font-bold'>❁  Brands </span>
              <span className='text-white text-5xl scroller capitalize font-bold'>❁  sneakers </span>
              {/* Duplicate content for seamless scrolling */}
              <span className='text-white text-5xl scroller capitalize font-bold'>❁  Mens </span>
              <span className='text-green-800 text-5xl scroller capitalize font-bold'>❁  Women </span>
              <span className='text-white text-5xl scroller capitalize font-bold'>❁  Accessories </span>
              <span className='text-green-800 text-5xl scroller capitalize font-bold'>❁  Kids </span>
              <span className='text-white text-5xl scroller capitalize font-bold'>❁  fashions </span>
              <span className='text-green-800 text-5xl scroller capitalize font-bold'>❁  Brands </span>
              <span className='text-white text-5xl scroller capitalize font-bold'>❁  sneakers </span>
         
          </div>
       

      </div>
      <ProCard/>
      
    </Layout>
    {/* <SingleProduct/> */}
    </>
  )
}

export default Home