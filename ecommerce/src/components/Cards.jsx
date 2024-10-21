import React, { useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

function Cards() {
  const [isWishlisted, setIsWishlisted] = useState(false)
  return (
    <>
      <div className="bg-gray-500 px-5">
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 content-center gap-3 place-content-center">
          <div className="col-span-1 my-5 bg-green-500 justify-items-center flex justify-center">
          <div className="w-full max-w-sm overflow-hidden group a  transition-all duration-300 hover:shadow-lg relative bg-white rounded-lg">
      <div className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium leading-none  mb-1">Modern Chair</h3>
              <p className="text-sm text-gray-500">Ergonomic Design</p>
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart
                className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
              />
              <span className="sr-only">
               
              </span>
            </button>
          </div>
          <p className="text-lg font-semibold">$199.99</p>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:translate-y-0 translate-y-16 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FiShoppingCart className="h-5 w-5" />
        <span className="sr-only">Add to cart</span>
      </button>
    </div>
          </div>
          <div className="col-span-1 my-5 bg-green-500 justify-items-center flex justify-center">
          <div className="w-full max-w-sm overflow-hidden group a  transition-all duration-300 hover:shadow-lg relative bg-white rounded-lg">
      <div className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium leading-none  mb-1">Modern Chair</h3>
              <p className="text-sm text-gray-500">Ergonomic Design</p>
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart
                className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
              />
              <span className="sr-only">
               
              </span>
            </button>
          </div>
          <p className="text-lg font-semibold">$199.99</p>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:translate-y-0 translate-y-16 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FiShoppingCart className="h-5 w-5" />
        <span className="sr-only">Add to cart</span>
      </button>
    </div>
          </div>
          <div className="col-span-1 my-5 bg-green-500 justify-items-center flex justify-center">
          <div className="w-full max-w-sm overflow-hidden group a  transition-all duration-300 hover:shadow-lg relative bg-white rounded-lg">
      <div className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium leading-none  mb-1">Modern Chair</h3>
              <p className="text-sm text-gray-500">Ergonomic Design</p>
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart
                className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
              />
              <span className="sr-only">
               
              </span>
            </button>
          </div>
          <p className="text-lg font-semibold">$199.99</p>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:translate-y-0 translate-y-16 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FiShoppingCart className="h-5 w-5" />
        <span className="sr-only">Add to cart</span>
      </button>
    </div>
          </div>
          <div className="col-span-1 my-5 bg-green-500 justify-items-center flex justify-center">
          <div className="w-full max-w-sm overflow-hidden group a  transition-all duration-300 hover:shadow-lg relative bg-white rounded-lg">
      <div className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium leading-none  mb-1">Modern Chair</h3>
              <p className="text-sm text-gray-500">Ergonomic Design</p>
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart
                className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
              />
              <span className="sr-only">
               
              </span>
            </button>
          </div>
          <p className="text-lg font-semibold">$199.99</p>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:translate-y-0 translate-y-16 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FiShoppingCart className="h-5 w-5" />
        <span className="sr-only">Add to cart</span>
      </button>
    </div>
          </div>
          <div className="col-span-1 my-5 bg-green-500 justify-items-center flex justify-center">
          <div className="w-full max-w-sm overflow-hidden group a  transition-all duration-300 hover:shadow-lg relative bg-white rounded-lg">
      <div className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-medium leading-none  mb-1">Modern Chair</h3>
              <p className="text-sm text-gray-500">Ergonomic Design</p>
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart
                className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
              />
              <span className="sr-only">
               
              </span>
            </button>
          </div>
          <p className="text-lg font-semibold">$199.99</p>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 group-hover:translate-y-0 translate-y-16 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FiShoppingCart className="h-5 w-5" />
        <span className="sr-only">Add to cart</span>
      </button>
    </div>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Cards;
