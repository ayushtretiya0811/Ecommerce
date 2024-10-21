import React, { useEffect, useState } from 'react'
import AdminMain from '../AdminMain'
import axios from 'axios'
import { useAuth } from '../../../context/authContex'
import {toast} from 'react-hot-toast'
function AddCategory() {
  const {token} =  useAuth()
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')
    const [subcategory, setSubcategory] = useState(null)
    const [categories, setCategories] = useState([])


      const allCategories = async () => {
        try {
          
          const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/admin/allcategoryDisplay`,{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          })
          if (res.data.success) {
            setCategories(res.data.category)
            console.log(res.data.category)
          }
        } catch (error) {
          console.log(error)
        }
      }
      const addcategoryFunction = async (e) => {
        e.preventDefault()
     

   
      try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/admin/addcategory`, {
          name: categoryName,
          description : description,
          parent : subcategory
        },{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        if(res.data.success){
        toast.success("Category added successfully")
        allCategories()
        }
        } catch (error) {

        console.log(error)
      }
      }
        useEffect(() => {
          if(token){
            
            allCategories()
          }
        },[token])
    
  return (
<>
<AdminMain>
<div className="flex p-4 font-sans">
      {/* Sidebar */}
      <div className="w-1/4 pr-4">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <p className="text-sm text-gray-600 mb-4">
          Use this form to add a new category to your product catalog. Fill in the details, select a subcategory, and click "Add Category" to submit.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-3/4">
        <form  className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter category description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
          
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a Category</option>
              {categories?.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
          {/* {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )} */}
          <button 
            type="submit" 
            onClick={addcategoryFunction}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>

</AdminMain>
</>
  )
}

export default AddCategory