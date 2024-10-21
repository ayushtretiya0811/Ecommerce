//create context for whole app
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContex';
import toast from 'react-hot-toast';
export const ProductContext = createContext()


export const ProductProvider = ({children}) => {
const [products, setProducts] = useState()
const [singleproduct, setSingleproduct] = useState()
const  [cartItem, setcartItem] = useState()
const navigate = useNavigate()
const {token} = useAuth()
const fetchData = async  () => {
    try {
      const res  = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/allproduct`,
       
      )
      if (res.data.success) {
        setProducts(res.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getSingleProduct = async (id) => {
    try {
      const res  = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/singleProduct/${id}`)
      if (res.data.success) {
        // setproduct(res.data.products)
       const prod= localStorage.setItem('product', JSON.stringify(res.data.product))
        setSingleproduct(prod);
        navigate('/singleproduct')

      }
    } catch (error) {
      console.log(error)
    }
  }
  const AllCartItems = async () => {
    try {
      const res  = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/product/cart-items`
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log("API Response:", res);
      if (res.data.success) {
        console.log("Cart Items:", res.data.cart);
        setcartItem(res.data.cart);
        return res.data.cart
      }
    } catch (error) {
      console.log(error)
    }
  }
  const AddToCart = async (productId , size  ,quantity=1) => {
   try {
    const res  = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/product/add-to-cart`, {
      productId,
      size,
      quantity
    }
  ,{
    headers: {
      Authorization: `Bearer ${token}`,    
      "Content-Type": "application/json",    
    }
  })
    if (res.data.success) {
      toast.success(res.data.message)
    }
   } catch (error) {
    console.log(error)
   }
  }
useEffect(() => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchData()
    console.log(`${localStorage.getItem('token')}`)
    console.log('token', token)
},[])
    return (
        <ProductContext.Provider value={{products, setProducts, getSingleProduct, singleproduct, setSingleproduct, AddToCart , AllCartItems}}>{children}</ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)
