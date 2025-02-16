import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";
import axios from "axios";


const Cart = () => {
  const { getCartItems, allCartItems } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);


  function increamentCount(id, countitem) {
    console.log(localStorage.getItem('token'))
    console.log(id, countitem)
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count: countitem
    }, {
      headers: { token: localStorage.getItem('token') },
    }).then((res => {
      console.log(res)
      fetchCart()
    })).catch((err) => {
      console.log(err)
    })
  }
  function removeItem(id) {
    console.log(localStorage.getItem('token'))
    console.log(id)
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: { token: localStorage.getItem('token') },
    }).then((res => {
      console.log(res)
      fetchCart();
    })).catch((err) => {
      console.log(err)
    })
  }
  const fetchCart = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items || []);

    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  console.log(allCartItems)

  // Calculate total price
  const getTotalPrice = () => {
    return allCartItems.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-gray-700">
          <thead className="bg-gray-100 text-gray-900">
            <tr className="text-sm md:text-lg">
              <th className="p-4">Image</th>
              <th className="p-4">Product</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {allCartItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 text-center">
                  <img
                    src={item?.product?.imageCover}
                    className="w-16 md:w-24 rounded-lg shadow"
                    alt={item.name}
                  />
                </td>
                <td className="p-4 font-semibold text-gray-900 text-center">{item?.product?.title}</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => increamentCount(item.product._id, item.count - 1)}

                      className="p-2 border rounded-full text-gray-600 hover:bg-gray-200 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-semibold">{item.count}</span>
                    <button
                      onClick={() => increamentCount(item.product._id, item.count + 1)}
                      className="p-2 border rounded-full text-gray-600 hover:bg-gray-200 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="p-4 font-semibold text-center">${item.price * item.count}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Price & Checkout */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">
          Total Price: <span className="text-green-600">${getTotalPrice()}</span>
        </h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition mt-4 sm:mt-0"
          onClick={() => alert("Proceeding to payment...")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;