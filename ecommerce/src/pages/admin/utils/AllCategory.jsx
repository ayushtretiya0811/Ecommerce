import React, { useEffect, useRef, useState } from "react";
import AdminMain from "../AdminMain";
import axios from "axios";
import { useAuth } from "../../../context/authContex";
function AllCategory() {
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();
  const inputRef = useRef(null);
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingSubcategory, setEditingSubcategory] = useState(null)

  const allCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/admin/allcategory`
      );
      if (res.data.success) {
        setCategories(res.data.category);
        console.log(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      allCategories();
    }
  }, [token]);






  const handleEditCategory = (categoryId) => {
    setEditingCategory(categoryId)
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  }
  const handleEditSubcategory = (subcategoryId) => {
    setEditingSubcategory(subcategoryId)
  }
  const handleSaveCategory = (categoryId, newName) => {
    setEditingCategory(null)
  }
  const handleSaveSubcategory = (subcategoryId, newName) => {
    setEditingSubcategory(null)
  }
  const handleDeleteCategory = (categoryId) => {}
  const handleDeleteSubcategory = (subcategoryId) => {}

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category._id} className="mb-4 relative ">
        <div className=" grid grid-cols-2">
    
          {editingCategory === category._id ? (
            <input
              type="text"
              ref={inputRef}
              defaultValue={category.name}
              onBlur={(e) => handleSaveCategory(category._id, e.target.value)}
              className="border-gray-300 rounded-md px-3 py-2 w-full  "
             
            />
          ) : (
            <>
            <div className="col-span-1 p-2">

            <span className="text-center">👉 {category.name}</span>
            </div>
            
            </>
          )}
          <div className=" col-span-1 space-x-3 flex  mt-2 ">
            <button
              onClick={() => handleEditCategory(category._id)}
              className="text-white bg-blue-500 p-2 "
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="text-white bg-red-600  p-2"
            >
              Delete
            </button>
          </div>
        </div>
        {category.children && category.children.length > 0 && (
          <ul className="ml-4">
           
             {  renderCategories(category.children)}
          </ul>
        )}
      </li>
    ));
  };
  return (
    <>
      <AdminMain>
  
          
 

{/* 
  <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Categories and Subcategories</h1>
        <ul>
          {categories
            .filter((category) => category.parent === null)
            .map((mainCategory) => (
              <li key={mainCategory._id} className="mb-4">
                <div className="flex items-center justify-between">
                  {editingCategory === mainCategory._id ? (
                    <input
                      type="text"
                      defaultValue={mainCategory.name}
                      onBlur={(e) =>
                        handleSaveCategory(mainCategory._id, e.target.value)
                      }
                      className="border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                  ) : (
                    <h2 className="text-lg font-bold">{mainCategory.name}</h2>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => handleEditCategory(mainCategory._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCategory(mainCategory._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                {mainCategory.children && mainCategory.children.length > 0 && (
                  <ul className="ml-4 mt-2">
                    {renderCategories(mainCategory.children)}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div> */}


{/* <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Categories and Subcategories</h1>
        <ul>{renderCategories(categories)}</ul>
      </div> */}



      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 mx-3">
          Categories and Subcategories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
          {categories
            .filter((category) => category.parent === null)
            .map((mainCategory) => (
              <div
                key={mainCategory._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  {editingCategory === mainCategory._id ? (
                    <input
                    
                    ref={inputRef}
                      type="text"
                      defaultValue={mainCategory.name}
                      onBlur={(e) =>
                        handleSaveCategory(mainCategory._id, e.target.value)
                      }
                      className="border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                  ) : (
                    <h2 className="text-lg font-bold"> {mainCategory.name}</h2>
                  )}
                  <div className="flex gap-2">
                    <button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCategory(mainCategory._id)}
                    >
                      Edit
                    </button>
                    <button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(mainCategory._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  
                  <ul>
                  {renderCategories(
                     mainCategory.children
                    )}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
{/* 
<div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6 mx-3">
            Categories and Subcategories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
          {
 categories
 .filter((category) => category.parent === null)
 .map((mainCategory) => (
              <div
                key={mainCategory._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  {editingCategory === mainCategory._id ? (
                    <input
                      type="text"
                      defaultValue={mainCategory.name}
                      onBlur={(e) =>
                        handleSaveCategory(mainCategory._id, e.target.value)
                      }
                      className="border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                  ) : (
                    <h2 className="text-lg font-bold">{mainCategory.name}</h2>
                  )}
                  <div className="flex gap-2">
                    <button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCategory(mainCategory._id)}
                    >
                      Edit
                    </button>
                    <button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(mainCategory._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                {categories.filter((category) => category.parent === mainCategory._id).map((childCategory) => (
                    <div
                      key={childCategory._id}
                      className="bg-gray-100 rounded-lg p-4 flex items-center justify-between"
                    >
                      {editingSubcategory === childCategory._id ? (
                        <input
                          type="text"
                          defaultValue={childCategory.name}
                          onBlur={(e) =>
                            handleSaveSubcategory(
                              childCategory._id,
                              e.target.value
                            )
                          }
                          className="border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                      ) : (
                        <span>{childCategory.name}</span>
                      )}
                      <div className="flex gap-2">
                        <button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSubcategory(childCategory._id)}
                        >
                          Edit
                        </button>
                        <button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDeleteSubcategory(childCategory._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6 mx-3">
            Categories and Subcategories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
          {categories
          .filter((category) => category.parent === null)
          .map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  {editingCategory === category._id ? (
                    <input
                      type="text"
                      defaultValue={category.name}
                      onBlur={(e) =>
                        handleSaveCategory(category._id, e.target.value)
                      }
                      className="border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                  ) : (
                    <h2 className="text-lg font-bold">{category.name}</h2>
                  )}
                  <div className="flex gap-2">
                    <button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCategory(category._id)}
                    >
                      Edit
                    </button>
                    <button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                {categories
                .filter(
                  (subCategory) => subCategory.parent === category._id
                )
                .map((subcategory) => (
                    <div
                      key={subcategory._id}
                      className="bg-gray-100 rounded-lg p-4 flex items-center justify-between"
                    >
                      {editingSubcategory === subcategory._id ? (
                        <input
                          type="text"
                          defaultValue={subcategory.name}
                          onBlur={(e) =>
                            handleSaveSubcategory(
                              subcategory._id,
                              e.target.value
                            )
                          }
                          className="border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                      ) : (
                        <span>{subcategory.name}</span>
                      )}
                      <div className="flex gap-2">
                        <button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditSubcategory(subcategory._id)}
                        >
                          Edit
                        </button>
                        <button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDeleteSubcategory(subcategory._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </AdminMain>
    </>
  );
}

export default AllCategory;
