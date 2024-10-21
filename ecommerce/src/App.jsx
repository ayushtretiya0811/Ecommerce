import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import SingleProduct from './components/SingleProduct'
import AddProduct from './pages/admin/AddProduct'
import { Toaster } from 'react-hot-toast'
import AdminPanel from './pages/admin/AdminPanel'
import AllProducts from './pages/admin/utils/AllProducts'
import { ProductProvider } from './context/ProductContex'
import { AuthProvider } from './context/authContex'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Cart from './pages/Cart'
import AddCategory from './pages/admin/utils/AddCategory'
import AllCategory from './pages/admin/utils/AllCategory'
import ProtectedRoutes from './layout/ProtectedRoutes'
import AdminProtectedRoutes from './layout/AdminRoutes'
import EditProduct from './pages/admin/utils/EditProduct'
import Order from './pages/admin/utils/Order'
import DisplayOrders from './pages/admin/utils/DisplayOrders'
import Cards from './components/Cards'
import ProductPage from './pages/ProductPage'


function App() {
  const [count, setCount] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem('user'));
    if (userinfo && userinfo?.admin === true) {
      setIsAdmin(true);
    }
  }, []);
  return (
    <>
    <BrowserRouter>
    <AuthProvider>

    <ProductProvider>
      <Toaster/>

    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    <Route path="/card" element={<Cards />} />

      
      <Route element={<ProtectedRoutes />} >
      <Route path='/' element={isAdmin ? <Navigate to="/admin"  /> : <Home/>}/>

      {/* <Route path='/cart' element={<Cart/>}/> */}
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/singleproduct' element={<SingleProduct />}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/allorders' element={<DisplayOrders/>}/>
      <Route path='/allproducts' element={<ProductPage/>}/>
      </Route>


      <Route  element={<AdminProtectedRoutes  /> } >
      <Route path='/admin' element={<AdminPanel/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/allproduct' element={<AllProducts/>}/>
      <Route path='/Addcategory' element={<AddCategory/>}/>
      <Route path='/editproduct/:id' element={<EditProduct/>}/>
      <Route path='/allcategory' element={<AllCategory/>}/>
      </Route>
     {/* <Home/> */}
    </Routes>
    </ProductProvider>
    </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
