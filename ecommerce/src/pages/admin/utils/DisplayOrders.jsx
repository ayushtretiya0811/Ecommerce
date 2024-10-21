import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContex";
import axios from "axios";
import Layout from "../../../layout/Layout";

function DisplayOrders() {
    const [orders, setorders] = useState()
    const {token} = useAuth()
    console.log("orders", orders) 
    const fetchOrder = async () => {
        try {
            const res  = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/order/allorders`, {
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.data.success) {
                setorders(res.data.orders)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const downloadInvoice = async (orderId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_REACT_APP_API}/api/order/invoice/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob', // Important for receiving binary data
            }
          );
    
          // Create a blob from the PDF stream
          const file = new Blob([response.data], { type: 'application/pdf' });
    
          // Create a link element, click it, and remove it
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = `invoice-${orderId}.pdf`;
          link.click();
          URL.revokeObjectURL(fileURL);
        } catch (error) {
            console.error('Error downloading invoice:', error);
        }
      };
    useEffect(() => {
        fetchOrder()
    },[token])
  return (
      <>
    <Layout>

      <div className="bg-background min-h-screen mt-28">
        <header className="bg-muted py-4 px-6">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Orders</h1>
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-md border border-muted-foreground px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                </svg>
                Print
              </button>
              <button className="inline-flex items-center gap-2 rounded-md border border-muted-foreground px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                Export
              </button>
            </div>
          </div>
        </header>
        <main className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.map((order) => (
              <>
              <div
            key={order.id}
            className="bg-card rounded-md overflow-hidden shadow-sm"
          >
                 {order?.products?.map((product) => (
            <div className="flex gap-4 p-4" key={product._id}>
                
              <img
                 src={`http://localhost:1000/${product?.productId?.images[0]}`}
                 alt={order.name}
                 width={100}
                 height={100}
                 className="rounded-md object-cover"
                 style={{ aspectRatio: "100/100", objectFit: "cover" }}
                 />
              <div className="flex-1 grid gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{product.productId?.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full
                        ${order.status === "paid"
                            ? "bg-green-500 text-green-50"
                        : order.status === "Declined"
                        ? "bg-red-500 text-red-50"
                        : "bg-yellow-500 text-yellow-50"
                    }`}
                  >
                   { order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.productId.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${product.price}</span>
                    <span className="text-muted-foreground">
                     X { product.quantity}
                    </span>
                    
                  </div>
                
                  <button className="inline-flex items-center justify-center rounded-md border border-muted-foreground px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
              </div>
            </div>
                 ))}
          <button
                  onClick={() => downloadInvoice(order._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                >
                  Download Invoice
                </button>
          </div>
          </>
           ))} 
        </main>
      </div>
                 </Layout>
    </>
  );
}

export default DisplayOrders;
