import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import AdminMain from './AdminMain';
function AddProduct() {
    const [modelopen , setModelopen] = useState(false)
    const [previewUrls, setPreviewUrls] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: [],
        sizes: []
      });
      console.log('this is images',   formData.images)
      console.log("this is FormData", formData)
      const [newSize, setNewSize] = useState({
        size: '',
        price: '',
        stock: ''
      });
      const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [fieldName]: value
        }));
      };
      const handleSizeChange = (index, fieldName, newValue) => {
        setFormData((prevData) => ({
          ...prevData,
          sizes: prevData.sizes.map((size, i) => 
            i === index ? { ...size, [fieldName]: newValue } : size
          )
        }));
      };
    
    
      const handleNewSizeChange = (e) => {
        const { name, value } = e.target;
        setNewSize(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      console.log(newSize);
      const addSize = () => {
        if (!newSize.size || !newSize.price || !newSize.stock) {
          alert('Please fill in all size fields.');
          return;
        }
    
        setFormData((prevState) => ({
          ...prevState,
          sizes: [...prevState.sizes, { ...newSize }]
        }));
    
        setNewSize({ size: '', price: '', stock: '' });
      };
    
      const removeSizeField = (indexToRemove) => {
        setFormData((prevData) => ({
          ...prevData,
          sizes: prevData.sizes.filter((_, index) => index !== indexToRemove)
        }));
      };



      const handleImageChange = (e) => {
        const files = Array.from(e.target.files);// Access the first file from the files list
        const urls = files.map((file) => URL.createObjectURL(file));
      
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...files] // Append the new file to the existing images array
        }));
      
      
        setPreviewUrls((prevUrls) => [...prevUrls, ...urls]); // Append the new URL to the existing URLs array
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        formData.sizes.forEach((size, index) => {
            data.append(`sizes[${index}][size]`, size.size);
            data.append(`sizes[${index}][price]`, size.price);
            data.append(`sizes[${index}][stock]`, size.stock);
        });
        formData.images.forEach((image) => {
            data.append('images', image);
        });
        console.log(data.images);
        try {
          const res  =await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/admin/addproduct`,
            data,
            {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          )
          ;
          console.log(res.data);
          if(res.data.success){
            toast.success(res.data.message);  
            setModelopen(false)
            setFormData({
              name: '',
              description: '',
              images: [],
              sizes: []
            })
            setNewSize({ size: '', price: '', stock: '' });
            setPreviewUrls([]);
          }
          // Handle successful submission (e.g., show a success message)
        } catch (error) {
          console.error('There was an error!', error);
          // Handle errors (e.g., show an error message)
        }
      };
      useEffect(() => {
       
        return () => {
          previewUrls.forEach((url) => URL.revokeObjectURL(url));
        };
      }, [previewUrls]);
  return (
    <>
<AdminMain>
<div className="max-w-2xl mx-auto p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <div className="grid gap-6">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            placeholder="Enter product name"
            onChange={(e) => handleInputChange('name', e.target.value)}
            className=" block w-full rounded-md p-3 border-black border-2  shadow-xl sm:text-sm"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter product description"
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="block w-full rounded-md p-2  border-black border-2 shadow-xl focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="grid gap-1.5">
          <label  className="text-sm font-medium">
            Image
          </label>
          <div className="flex items-center gap-2">
         
            <input
              type="file"
       
              name="images"
              formEncType='multipart/form-data'
           
              onChange={handleImageChange}
              className="block w-full rounded-md border-black border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              multiple
            />


            <button
              type="button"
              
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload
            </button>
          </div>
        </div>
        <div  className='flex flex-row gap-4'>
        {previewUrls.map((url, index) => (
  <img src={url} alt={`Selected image ${index}`} key={index} style={{ width: '100px', height: 'auto' }} />
))}
</div>
        {formData.sizes.length > 0 && formData.sizes.map((size, index) => (
        <div key={index} className="grid sm:grid-cols-4 gap-6">
          <div className="grid gap-1.5">
            <label htmlFor="size" className="text-sm font-medium">
              Size
            </label>
            <input
              id="size"
              type="text"
              placeholder="Enter size"
              value={size.size}
              onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
              className="block w-full rounded-md border-black border-2  shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
         
          <div className="grid gap-1.5">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              value={size.price}
              onChange={(e) => handleSizeChange(index, 'pric', e.target.value)}
              className="block w-full rounded-md border-black border-2shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="stock" className="text-sm font-medium">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter stock"
              value={size.stock}
              onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
              className="block w-full rounded-md border-black border-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div className="grid gap-1.5">
          <button
            type="button"
            onClick={() => removeSizeField(index)}
            className="ml-auto  py-2  px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Remove Size
          </button>
          </div>
        </div>
        ))}



<div  className={`grid sm:grid-cols-4 gap-6  ${modelopen ? 'block' : 'hidden'}  `}>
          <div className="grid gap-1.5">
            <label htmlFor="size" className="text-sm font-medium">
              Size
            </label>
            <input
              id="size"
              type="text"
              placeholder="Enter size"
              name="size"
                  value={newSize.size}
                  onChange={handleNewSizeChange}
              className="block p-2 w-full rounded-md border-black border-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
         
          <div className="grid gap-1.5">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              name="price"
              value={newSize.price}
              onChange={handleNewSizeChange}
              className="block p-2 w-full rounded-md border-black border-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="stock" className="text-sm font-medium">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter stock"
              name="stock"
              value={newSize.stock}
              onChange={handleNewSizeChange}
              className="block p-2  w-full rounded-md border-black border-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div className="grid gap-1.5">
          <button
        type="button"
        onClick={addSize}
        // ml-auto  py-2  px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        className=" justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add
      </button>
      </div>
</div>

   <button
        type="button"
        onClick={(e) => setModelopen(true , e.preventDefault())}
        className="inline-flex mt-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add Sizes
      </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-md border bg-slate-700 border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Add Product
        </button>
      </div>
    </div>









{/* <div className="w-full max-w-4xl relative">
      <div className="bg-card rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Create New Product</h2>
          <p className="text-muted-foreground">Fill out the form to add a new product.</p>
        </div>
        <div className="p-6 border-t">
          <form className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                className="bg-muted rounded-md border border-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                className="bg-muted rounded-md border border-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Images</div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="bg-muted rounded-md border border-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
               
              </div>
            </div>
            <div className={` ${modelopen ? 'block' : 'hidden'}  `}>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label htmlFor="size" className="text-sm font-medium">
                  Size
                </label>
                <div className="flex items-center gap-2">
                <input
                  id="price"
                  name="size"
                  value={newSize.size}
                  onChange={handleNewSizeChange}
                  placeholder="Enter Size"
                  className="bg-muted rounded-md border border-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                
                />
              </div>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={newSize.price}
                  onChange={handleNewSizeChange}
                  placeholder="Enter price"
                  className="bg-muted rounded-md border border-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="stock" className="text-sm font-medium">
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  name="stock"
                  value={newSize.stock}
                  onChange={handleNewSizeChange}
                  placeholder="Enter stock"
                  className="bg-muted rounded-md border border-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <button
        type="button"
        onClick={addSize}
        className="inline-flex mt-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add
      </button>
            </div>
            <button className='bg-blue-400' onClick={(e) => setModelopen(true , e.preventDefault())}>
                add sizes
            </button>
            
             <form onSubmit={handleSubmit} className="space-y-4">
  

      {formData.sizes.length > 0 && formData.sizes.map((size, index) => (
        <div key={index} className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Size"
            value={size.size}
            onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <input
            type="number"
            placeholder="Price"
            value={size.price}
            onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <input
            type="number"
            placeholder="Stock"
            value={size.stock }
            onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <button
            type="button"
            onClick={() => removeSizeField(index)}
            className="ml-auto py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Remove Size
          </button>
        </div>
      ))}

    

      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button>
    </form>
          </form>
        </div>
        <div className="p-6 border-t">
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Create Product
          </button>
        </div>
      </div>
    </div> */}
</AdminMain>

    </>
  )
}

export default AddProduct
