import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/Layout'
import { useAuth } from '../../../context/authContex';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useProduct } from '../../../context/ProductContex';

function Order() {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  // const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const {token , userdetail , getUser  } = useAuth()
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const {AllCartItems} = useProduct()
  const [cart, setCart] = useState();
  console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
  const totalPrice = cart?.products.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  console.log(totalPrice)
  const handleSubmit = async  (e) =>{
 e.preventDefault();
      try {
        
        // const data = {AddressLine1, AddressLine2, city, state, postalCode}
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/order/addAddress`, {
          addressLine1, addressLine2, city, state, postalCode
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        }      )
        if(res.data.success){
          toast.success(res.data.message)
          getUser(userdetail?._id)
          setAddressLine1('')
          setAddressLine2('')
          setCity('')
          setState('')
          setPostalCode('')


        }
 
      } catch (error) {
        console.log(error)
      }
  }

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/order/createOrder`, {
        amount: totalPrice,
        
       // amount in paise
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.data.success) {
        const { order } = res.data;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Ecommerce",
          description: "Test Transaction",
          order_id: order.id,
          handler: async (response) => {
            const paymentRes = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/order/verifyPayment`, {
              response,
              products: cart.products, // Send products array
              totalPrice: totalPrice,
            }, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (paymentRes.data.success) {
              toast.success("Payment successful");
              // Handle post-payment success actions
            } else {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: userdetail?.username,
            email: userdetail?.email,
            // contact: userdetail.phone,
          },
          notes: {
            address: "Ecommerce Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment initiation failed");
    }
  };
useEffect(()=>{
  const fetchCart = async () => {
    
    const cart = await AllCartItems()
    console.log(cart)
    setCart(cart)
  }
  fetchCart()
},[ token])

  return (
<>
<Layout>

<div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h1 className="text-2xl font-bold mb-4">Enter Your New  Address</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="address1" className="block mb-1 font-medium">
                Address 1
              </label>
              <input
                id="address1"
                type="text"
                 value={addressLine1}
                  onChange={(e) =>  setAddressLine1( e.target.value)}
                placeholder="123 Main St"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="address2" className="block mb-1 font-medium">
                Address 2
              </label>
              <input
                id="address2"
                type="text"
                placeholder="Apartment, suite, etc."
                value={addressLine2}
                 onChange={(e)=> setAddressLine2(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block mb-1 font-medium">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="San Francisco"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-1 font-medium">
                  State
                </label>
               <select name="state" id=" state" 
               value={state} 
               className='w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary custom-select'
               onChange={(e)=> setState(e.target.value)}
               >
                <option   className='bg-gray-400 p-2' defaultChecked>select state</option>
                <option value="Gujarat" className='p-2'>Gujarat</option>
                <option value="Maharastra" className='p-2'>Maharastra</option>
                <option value="Utterpradesh" className='' >Utterpradesh</option>
                <option value="Kolkata" className='p-2'>Kolkata</option>
                <option value="Tamilnadu" className='p-2'>Tamilnadu</option>
                <option value="Panjab" className='p-2'>Panjab</option>
                <option value="Haryana" className='p-2'>Haryana</option>
               </select>
              </div>
            </div>
            <div>
              <label htmlFor="postalCode" className="block mb-1 font-medium">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="94101"
                value={postalCode}
                 onChange={(e)=> setPostalCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              onClick={ handleSubmit}  

              className="w-full px-4 py-2 bg-slate-500 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add Address
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Previous Addresses</h2>
          {
            isAddressSelected? null : <p className="text-gray-500"> Please select an address</p>
          }
          <div className="space-y-4">
            {
              userdetail?.addresses.map((address) => (
                <div key={address._id} className="p-4 bg-gray-100 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{address.addressLine1}</h3>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="address"
                        onClick={() => setIsAddressSelected(true)}
                        value={address._id}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-2">Use this address</span>
                    </label>
                  </div>
                  <address className="text-gray-500">
                    {address.addressLine2}, {address.city}, {address.state}, {address.postalCode}
                  </address>
                </div>
              ))}
              {
                isAddressSelected ? (
                  <button 
                  onClick={handlePayment}
                  className='w-full px-4 py-2 bg-slate-500 font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
                    <Link >Proceed to Payment</Link>
                  </button>
                )
              
                : null
              }
            
{/*           
            <div className="p-4 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Home</h3>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="address"
                    value="home"
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="ml-2">Use this address</span>
                </label>
              </div>
              <address className="text-gray-500">
                123 Main St
                <br />
                Anytown, CA 12345
              </address>
            </div> */}
            {/* <div className="p-4 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Work</h3>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="address"
                    value="work"
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="ml-2">Use this address</span>
                </label>
              </div>
              <address className="text-gray-500">
                456 Oak St
                <br />
                Anytown, CA 12345
              </address>
            </div> */}
          </div>
        </div>
      </div>
    </div>
</Layout>
</>
  )
}

export default Order