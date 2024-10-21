import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminMain from '../AdminMain';
import { useAuth } from '../../../context/authContex';
import toast from 'react-hot-toast';

function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [newSize, setNewSize] = useState({ size: '', price: 0, stock: 0 });
  const [newImages, setNewImages] = useState([]);
  const {token} = useAuth()

  useEffect(() => {
  

    fetchProduct();
  }, [id ]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/singleproduct/${id}`);
      if (response.data.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  const handleProductChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = product.sizes.map((size, i) => i === index ? { ...size, [field]: value } : size);
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleAddSize = () => {
    setProduct({ ...product, sizes: [...product.sizes, newSize] });
    setNewSize({ size: '', price: 0, stock: 0 });
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
};
// const handleEditSize = (index, field, value) => {
//   const updatedSizes = product.sizes.map((size, i) => i === index ? { ...size, [field]: value } : size);
//   setProduct({ ...product, sizes: updatedSizes });
// };

const handleDeleteSize = (index) => {
  const updatedSizes = product.sizes.filter((_, i) => i !== index);
  setProduct({ ...product, sizes: updatedSizes });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    newImages.forEach(image => formData.append('images', image));
    formData.append('sizes', JSON.stringify(product.sizes));
    formData.append('existingImages', JSON.stringify(product.images)); 
    console.log('Submitting form with data:', {
      name: product.name,
      description: product.description,
      sizes: product.sizes,
      existingImages: product.images,
      newImages: newImages
  });

    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/product/updateproduct/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toast.success(response.data.message)
        fetchProduct()
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <AdminMain>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <form >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={product.name}
                  onChange={(e) => handleProductChange("name", e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={product.description}
                  onChange={(e) => handleProductChange("description", e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="grid gap-2">
                <span className="block text-sm font-medium text-gray-700">Images</span>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  {product.images.map((image, index) => (
                    <>
                     <div key={index} className="relative">
                  <img
                     src={`http://localhost:1000/${image}`}
                    alt={`Product Image ${index + 1}`}
                    width={200}
                    height={200}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                   <button className="absolute top-2 right-2 bg-gray-900 text-white rounded-full p-2" 
                     onClick={(e) => {
                      e.preventDefault();
                      handleRemoveImage(index);
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M5 16.5a.75.75 0 01.75-.75h12.5a.75.75 0 110 1.5H5.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                </>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <span className="block text-sm font-medium text-gray-700">Sizes</span>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Size</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Stock</th>
                      <th className="px-4 py-2 text-left" />
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={size.size}
                            onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={size.price}
                            onChange={(e) => handleSizeChange(index, "price", parseFloat(e.target.value))}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={size.stock}
                            onChange={(e) => handleSizeChange(index, "stock", parseInt(e.target.value))}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          onClick={() => handleDeleteSize(index)}
                          >
                            <svg
                              className="-ml-1 mr-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newSize.size}
                          onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={newSize.price}
                          onChange={(e) => setNewSize({ ...newSize, price: parseFloat(e.target.value) })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={newSize.stock}
                          onChange={(e) => setNewSize({ ...newSize, stock: parseInt(e.target.value) })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={handleAddSize}
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <svg
                            className="-ml-1 mr-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-4 inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </AdminMain>
  );
}

export default EditProduct;