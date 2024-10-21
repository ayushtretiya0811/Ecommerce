import React from 'react'
import { FaPlus, FaRegHeart } from "react-icons/fa";
import img  from '../assets/react.svg'
function ProductCard() {
  return (


    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container  ">

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-slate-100">
        <div className="relative">
          <img
            alt="Product Image"
            className="w-full h-64 object-cover"
            width={500}
            height={400}
            src={img}
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          
          />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            <FaRegHeart 
 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold truncate">Stylish Leather Backpack</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 line-through mr-2">$99.99</span>
              <span className="text-primary font-semibold">$79.99</span>
            </div>
            <button size="sm">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-gray-950">
        <div className="relative">
          <img
            alt="Product Image"
            className="w-full h-60 object-cover"
            height={300}
            src="/placeholder.svg"
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width={400}
          />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            <FaRegHeart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold truncate">Wireless Noise-Cancelling Headphones</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 line-through mr-2">$199.99</span>
              <span className="text-primary font-semibold">$149.99</span>
            </div>
            <button size="sm">Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-gray-950">
        <div className="relative">
          <img
            alt="Product Image"
            className="w-full h-60 object-cover"
            height={300}
            src="/placeholder.svg"
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width={400}
          />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            <FaRegHeart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold truncate">Ergonomic Office Chair</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 line-through mr-2">$299.99</span>
              <span className="text-primary font-semibold">$249.99</span>
            </div>
            <button size="sm  " className='flex flex-row items-center gap-2 bg-gray-800 rounded-md p-2 text-white'>
                          <FaPlus className="w-3 h-3" />
                        {/* <FaPlus /> */}
                          Add to Cart
                        </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-gray-950">
        <div className="relative">
          <img
            alt="Product Image"
            className="w-full h-60 object-cover"
            height={300}
            src="/placeholder.svg"
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width={400}
          />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            <FaRegHeart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold truncate">Sleek Stainless Steel Water Bottle</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 line-through mr-2">$29.99</span>
              <span className="text-primary font-semibold">$24.99</span>
            </div>
            <button size="sm">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </section>
  )
}



export default ProductCard