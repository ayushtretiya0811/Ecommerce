import React, { useState } from 'react'
import Layout from '../layout/Layout'
import { CiSearch } from "react-icons/ci";
import img from "../assets/react.svg"
const products = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics", image: "/placeholder.svg?height=200&width=300" },
    { id: 2, name: "Smartphone", price: 699, category: "Electronics", image: "/placeholder.svg?height=200&width=300" },
    { id: 3, name: "Headphones", price: 199, category: "Electronics", image: "/placeholder.svg?height=200&width=300" },
    { id: 4, name: "T-shirt", price: 29, category: "Clothing", image: "/placeholder.svg?height=200&width=300" },
    { id: 5, name: "Jeans", price: 59, category: "Clothing", image: "/placeholder.svg?height=200&width=300" },
    { id: 6, name: "Sneakers", price: 89, category: "Footwear", image: "/placeholder.svg?height=200&width=300" },
    { id: 7, name: "Watch", price: 299, category: "Accessories", image: "/placeholder.svg?height=200&width=300" },
    { id: 8, name: "Backpack", price: 79, category: "Accessories", image: "/placeholder.svg?height=200&width=300" },
  ]
  
  const categories = ["Electronics", "Clothing", "Footwear", "Accessories"]
  const colors = ["bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-green-500"]
function ProductPage() {
    const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] =useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState([])
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  return (
<>
<Layout>

<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Colorful Product Showcase</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500 pl-10"
            />
            <CiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with filters */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 text-gray-700">Price Range</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                    //   onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-gray-700">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className={`${colors[index]} text-white px-2 py-1 rounded-full text-sm`}>{category}</span>
                    
                      </label>
                    ))}
                        {
                            selectedCategories.map((category, index) => (
                                <span key={category} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{category}</span>
                            ))
                        }
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content with product cards */}
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* {filteredProducts.map((product, index) => ( */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <div className="relative h-48">
                    <image
                    //   src={product.image}
                    src={img}
                    //   alt={product.name}
                    //   layout="fill"
                     
                      className="transition-opacity duration-300 hover:opacity-75 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-gray-800">product.name</h3>
                    <p className="text-2xl font-bold text-indigo-600">$product.price</p>
                    <p className={` text-white px-2 py-1 rounded-full text-sm inline-block mt-2`}>
                      product.category
                    </p>
                  </div>
                  <div className="px-6 pb-6">
                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              {/* ))} */}
            </div>
            {/* {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-8 text-xl">No products found matching your search criteria.</p>
            )} */}
          </main>
        </div>
      </div>
    </div>
</Layout>

</>
  )
}

export default ProductPage