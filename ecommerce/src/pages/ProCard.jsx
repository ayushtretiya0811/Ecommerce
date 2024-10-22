import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaRegHeart } from "react-icons/fa";
import img  from '../assets/react.svg'
import axios from 'axios';
import {  useProduct } from '../context/ProductContex';
import { useAuth } from '../context/authContex';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
function ProCard() {

const {products, getSingleProduct , AddToCart} = useProduct()
const [isWishlisted, setIsWishlisted] = useState(false)
const {token} = useAuth()

const addtocart = ( id , size , quantity) => {

if(token){
AddToCart(id , size , quantity)
}
}
  return (
  <>
  {/* <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
     
     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
   {
        products?.map((item) => (
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out group hover:shadow-xl hover:-translate-y-2" >
                    {/* <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                      <span className="sr-only">View Product</span>
                      </Link> */}
                      
                    {/* <img
                      src={`http://localhost:1000/${item.images[0]}`}
                      alt="Product 6"
                      width={500}
                      height={400}
                      className="object-cover w-full h-64"
                      style={{ aspectRatio: "500/400", objectFit: "cover" }}
                      onClick={()=>getSingleProduct(item._id)}
                    />
                       
                      <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            <FaRegHeart 
 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
                    <div className="p-4 bg-background">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold md:text-xl"> ${item.sizes[0].price}</h4>
                        <button size="sm  " onClick={()=>AddToCart(item._id , item.sizes[0].size )} className='flex flex-row items-center gap-2 bg-gray-800 rounded-md p-2 text-white'>
                          <FaPlus className="w-3 h-3" />
                     
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
  
              ) ) } */}
{/* 
        </div>
        </div> */}
    {/* </section> */} 
    <div className=" px-5">
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 content-center gap-3 place-content-center">
        {
        products?.map((item) => (
          <div className="col-span-1 my-5 justify-items-center flex justify-center">
          <div className="w-full max-w-sm overflow-hidden group a  transition-all duration-300 hover:shadow-xl relative bg-white rounded-lg">
      <div className="p-0">
        <div className=" md:h-[400px]  relative overflow-hidden">
          <img
          // src={`http://localhost:1000/${item.images[0]}`}
          src={`${import.meta.env.VITE_REACT_APP_API}/${item.images[0]}`}
            alt="Product Image"
        
            className="transition-transform duration-300 group-hover:scale-105 object-cover w-full h-full" 
            onClick={()=>getSingleProduct(item._id)}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
        </div>
        <div className="p-4 bg-gray-100">
          <div className="flex  justify-between items-start mb-2">
            <div>
              
              <h3 className="text-lg font-medium leading-none  mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description.substr(0, 40)}</p>
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              // onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart
                className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
              />
              <span className="sr-only">
               
              </span>
            </button>
          </div>
          <p className="text-lg font-semibold">₹{item.sizes[0].price}</p>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:translate-y-0 translate-y-16 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FiShoppingCart className="h-5 w-5" onClick={()=>AddToCart(item._id , item.sizes[0].size )} />
        <span className="sr-only" >Add to cart</span>
      </button>
    </div>
    </div>
       ) )}
    </div>
    </div>
  </>
  )
}

export default ProCard