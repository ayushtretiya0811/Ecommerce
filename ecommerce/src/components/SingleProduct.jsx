import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import img from "../assets/react.svg";
import { useProduct } from "../context/ProductContex";
import { useAuth } from "../context/authContex";
import Product from "../../../server/Models/ProductModel";

function SingleProduct() {
  const { setSingleproduct, singleproduct, AddToCart } = useProduct();
  const { token } = useAuth();
  const productData = JSON.parse(localStorage.getItem("product"));
  const [image, setImage] = useState(
    `http://localhost:1000/${productData?.images[0]}`
  );
  const [selectedSize, setSelectedSize] = useState(
    productData?.sizes?.[0]?.size
  );
  const [quantity, setQuantity] = useState(1);
  const onclickImage = (src) => {
    setImage(src);
  };
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };
  useEffect(() => {
    setSingleproduct(productData);
    console.log("singleproduct", productData);
  }, []);
  const addToCart = () => {
    if (token) {
      AddToCart(singleproduct._id, selectedSize);
      console.log("AddToCart", productData._id, selectedSize);
    }
  };

  return (
    <>
      <Layout>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="grid gap-4">
              <div className="aspect-[3/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800">
                <img
                  alt="Product Image"
                  height={900}
                  src={image}
                  style={{
                    aspectRatio: "600/900",
                    objectFit: "cover",
                  }}
                  width={600}
                />
              </div>
              <div className="hidden md:flex gap-4 items-start">
                {singleproduct?.images.map((image) => (
                  <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                    <img
                      alt="Preview thumbnail"
                      className="aspect-[5/6] object-cover"
                      height={120}
                      src={`http://localhost:1000/${image}`}
                      width={100}
                      onClick={() =>
                        onclickImage(`http://localhost:1000/${image}`)
                      }
                    />
                    <span className="sr-only">View Image 1</span>
                  </button>
                ))}
                {/* <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-[5/6] object-cover"
                height={120}
                src={`http://localhost:1000/${singleproduct?.images[0]}`}
                width={100}
                onClick={() => onclickImage(singleproduct?.images[0])}
              />
              <span className="sr-only">View Image 1</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-[5/6] object-cover"
                height={120}
         
                width={100}
                onClick={() => onclickImage("https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg")}
              />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-[5/6] object-cover"
                height={120}
                src="/placeholder.svg"
                width={100}
                onClick={() => onclickImage(img)}
              />
              <span className="sr-only">View Image 3</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                alt="Preview thumbnail"
                className="aspect-[5/6] object-cover"
                height={120}
                src="/placeholder.svg"
                width={100}
              />
              <span className="sr-only">View Image 4</span>
            </button> */}
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:gap-10 items-start">
            <div className="hidden md:flex items-start">
              <div className="grid gap-4">
                <h1 className="font-bold text-3xl lg:text-4xl">
                  {singleproduct?.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-gray-500 line-through mr-2">
                      $99.99
                    </span>
                    <span className="text-primary font-semibold">
                      $
                      {selectedSize
                        ? singleproduct?.sizes?.find(
                            (s) => s.size === selectedSize
                          ).price
                        : singleproduct?.sizes[0].price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <form className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <label className="text-base" htmlFor="color">
                  Color
                </label>
                <div className="flex items-center gap-2">
                  <label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-black"
                  >
                    <input
                      defaultChecked
                      id="color-black"
                      name="color"
                      type="radio"
                      value="black"
                    />
                    Black
                  </label>
                  <label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-white"
                  >
                    <input
                      id="color-white"
                      name="color"
                      type="radio"
                      value="white"
                    />
                    White
                  </label>
                  <label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-blue"
                  >
                    <input
                      id="color-blue"
                      name="color"
                      type="radio"
                      value="blue"
                    />
                    Blue
                  </label>
                </div>
              </div>
              <div className="grid gap-2">
                {singleproduct?.sizes?.map((item) => (
                  <>
                    <label className="text-base" htmlFor="size">
                      Size
                    </label>
                    <div className="flex items-center gap-2">
                      <label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="size-xs"
                      >
                        <input
                          id="size-xs "
                          checked={selectedSize === item?.size}
                          name="size"
                          type="radio"
                          value={item?.size}
                          onChange={handleSizeChange}
                        />
                        {item?.size}
                      </label>
                    </div>
                  </>
                ))}
              </div>
              <div className="grid gap-2">
                <label className="text-base" htmlFor="quantity">
                  Quantity
                </label>
                <div>
                  <>
                    <select
                      className="w-24 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-primary"
                      defaultValue="1"
                      id="quantity"
                      // value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </>

                  <span className="text-sm">
                    Stock:{" "}
                    {selectedSize
                      ? singleproduct?.sizes?.find(
                          (s) => s.size === selectedSize
                        ).stock
                      : singleproduct?.sizes[0].stock}
                  </span>
                </div>
              </div>
            </form>
            <button
              className="inline-flex h-10 items-center justify-center  hover:bg-slate-500 rounded-md bg-slate-600 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              onClick={() =>
                AddToCart(singleproduct?._id, selectedSize, quantity)
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default SingleProduct;
