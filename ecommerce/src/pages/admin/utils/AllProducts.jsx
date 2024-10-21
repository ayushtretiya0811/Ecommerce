import React, { useEffect, useState } from 'react'
import AdminMain from '../AdminMain'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AllProducts() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/allproduct`)
      if(response.data.success){
console.log(response.data.products)
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/product/deleteproduct/${id}`)
      if(response.data.success){
        toast.success(response.data.message)
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`); // Navigate to EditProduct page with product ID
  }
  useEffect(() => {
  
  fetchProducts();
  }, []);

  return (
    <AdminMain>
           <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-primary text-primary-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-right font-medium">image</th>
              {/* <th className="px-4 py-3 text-right font-medium">Stock</th> */}
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr  className="border-b bg-background hover:bg-muted transition-colors">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{product.description}</td>
                <td className="px-4 py-3 text-right font-medium">
                  <img  src={`http://localhost:1000/${product.images[0]}`} alt=""  width={50}/>
                </td>
                {/* <td className="px-4 py-3 text-right font-medium"></td> */}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button size="sm" className='bg-blue-500 text-white px-2 py-2 rounded-md'
                     onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button size="sm" className='bg-red-500 text-white px-2 py-2 rounded-md'
                     onClick={() => handleDelete(product._id)}
                     >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
           ))} 
          </tbody>
        </table>
      </div>
    </div>
    </AdminMain>
  )
}

export default AllProducts