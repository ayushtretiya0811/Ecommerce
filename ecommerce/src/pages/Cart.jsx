import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useAuth } from "../context/authContex";
import { useProduct } from "../context/ProductContex";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Cart() {
  const { token } = useAuth();
  const { AllCartItems } = useProduct();
  const [cartItem, setCartItem] = useState();
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  // const totalPrice = cartItem?.products?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;\
  const totalPrice = cartItem?.products.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  // console.log(cartItem)

  // for (let i = 0; i < cartItem?.products?.length; i++) {
  //    totalPrice += cartItem?.products?[i].price * cartItem?.products?[i].quantity
  // }
  const increseQuantity = async (productId, size) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/product/increase-quantity`,
        {
          productId,
          size,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setCartItem(res.data.cart);
        console.log("after increse", res.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQuantity = async (productId, size) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/product/decrease-quantity`,
        {
          productId,
          size,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setCartItem(res.data.cart);

        console.log("after decrease", res.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = async (productId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/product/remove-cart-item`,
        {
          productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setCartItem(res.data.cart);
        console.log("after remove", res.data.cart);
      }
      if (res.data.success) {
        setCartItem(res.data.cart);
        console.log("after remove", res.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItemButton = (productId) => {
    if (token) {
      removeCartItem(productId);
    }
  };
  const increaseQuantityButton = (productId, size) => {
    if (token) {
      increseQuantity(productId, size);
    } else {
      toast.error("Please Login First");
    }
  };
  const decreaseQuantityButton = (productId, size) => {
    if (token) {
      decreaseQuantity(productId, size);
    } else {
      toast.error("Please Login First");
    }
  };
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const res = await AllCartItems();
        setCartItem(res);
        console.log("data of cart", cartItem);
        const isOutOfStock = cartItem.products.find(
          (item) => item.isOutOfStock
        );
        if (isOutOfStock) {
          toast.error("Product is now out of stock");
        }
        // Log the cart items
        // Use data to render the cart items in your component
      };
      fetchData();
    }
  }, [token]);

  cartItem?.products?.map((item) => {
    console.log("product id in cart", item.productId._id);
  });
  return (
    <>
      <Layout>
        <div className="flex justify-center items-center min-h-screen">

       
        <div className="container   mx-auto  px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 text-white px-4 py-3 font-medium">
                Your Cart
              </div>
              <div className="divide-y dark:divide-gray-800">
                {cartItem?.products?.map((item) => (
                  <>
                    <div className="grid grid-cols-[80px_1fr_120px] items-center gap-4 p-4">
                      <img
                        alt="Product Image"
                        className="rounded-md object-cover"
                        height={80}
                        src={`${import.meta.env.VITE_REACT_APP_API}/${item?.productId?.images[0]}`}
                        style={{
                          aspectRatio: "80/80",
                          objectFit: "cover",
                        }}
                        width={80}
                      />
                      <div className="space-y-1">
                        <h3 className="font-medium">{item.productId.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {item.productId.description}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {item.size.size}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            decreaseQuantityButton(
                              item?.productId?._id,
                              item?.size
                            )
                          }
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-2 py-1 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 12H6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <span className="text-center w-8">{item.quantity}</span>

                        <>
                          {item.quantity >=
                          item.productId.sizes.find(
                            (size) => size.size === item.size
                          ).stock ? (
                            <span className="text-xs text-nowrap ">
                              Out of Stock
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  increaseQuantityButton(
                                    item?.productId?._id,
                                    item?.size
                                  )
                                }
                                disabled={
                                  item.quantity >=
                                  item.productId.sizes.find(
                                    (size) => size.size === item.size
                                  ).stock
                                }
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-2 py-1 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 6v12m6-6H6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                        </>
                      </div>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() =>
                          removeCartItemButton(item?.productId?._id)
                        }
                      >
                        remove
                      </button>
                      <div className="font-medium text-right">
                        ${item.price}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 font-medium">
                Order Summary
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span className="font-medium">${totalPrice}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>$207.00</span>
                </div>
                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-900">
                  <Link to={"/order"}>Proceed to Checkout</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
