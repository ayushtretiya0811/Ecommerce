import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SideBar() {
  const [openMenu, setOpenMenu] = useState();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // const adminlinks = [
  //   { path: "/", name: "Home" ,  },
  //   { path: "/cart", name: "cart" },
  //   { path: "", name: "Products" },
  //   { path: "/", name: "Contact" },
  // ];
  return (
  <>
  <div className='sideBar bg-grey-500 min-h-[620px]  overflow-y-auto   '>

  <aside className="bg-gray-800 text-white   p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </a>
          </li>
          <li>
            <button
              onClick={() => toggleMenu('users')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded"
            >
              <span>Users</span>
              <span className="text-sm">{openMenu === 'users' ? '▼' : '▶'}</span>
            </button>
            {openMenu === 'users' && (
              <ul className="ml-4 mt-2 space-y-1">
                <li><a href="#user-list" className="block p-1 hover:bg-gray-700 rounded">User List</a></li>
               
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleMenu('category')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded"
            >
              <span>Category</span>
              <span className="text-sm">{openMenu === 'category' ? '▼' : '▶'}</span>
            </button>
            {openMenu === 'category' && (
              <ul className="ml-4 mt-2 space-y-1">
                {/* <li><Link to="/addproduct" className="block p-1 hover:bg-gray-700 rounded">Product List</Link></li> */}
                <li><Link to="/allcategory" className="block p-1 hover:bg-gray-700 rounded">All Category</Link></li>
                <li><Link to="/addcategory" className="block p-1 hover:bg-gray-700 rounded">Add Category</Link></li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleMenu('products')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded"
            >
              <span>Products</span>
              <span className="text-sm">{openMenu === 'products' ? '▼' : '▶'}</span>
            </button>
            {openMenu === 'products' && (
              <ul className="ml-4 mt-2 space-y-1">
                <li><Link to="/allproduct" className="block p-1 hover:bg-gray-700 rounded">Product List</Link></li>
                <li><Link to="/addproduct" className="block p-1 hover:bg-gray-700 rounded">Add Product</Link></li>
              </ul>
            )}
          </li>
       
          <li>
            <button
              onClick={() => toggleMenu('order')}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded"
            >
              <span>Orders</span>
              <span className="text-sm">{openMenu === 'order' ? '▼' : '▶'}</span>
            </button>
            {openMenu === 'order' && (
              <ul className="ml-4 mt-2 space-y-1">
                {/* <li><Link to="/addproduct" className="block p-1 hover:bg-gray-700 rounded">Product List</Link></li> */}
                <li><Link to="/addcategory" className="block p-1 hover:bg-gray-700 rounded">All Order</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  
  </div>
  </>
  )
}

export default SideBar