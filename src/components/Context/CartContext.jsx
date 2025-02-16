import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast'

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [numberOfCartItem, setNumberOfCartItem] = useState(0);
    const [allCartItems, setAllCartItems] = useState([])
    const [cartId, setCartId] = useState()
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

    useEffect(() => {
        fetchCart();
    }, []);

    async function fetchCart() {
        try {
            setLoading(true);
            const res = await axios.get(apiUrl, {
                headers: { token: localStorage.getItem('token') },
            });
            setCartItems(res.data.data || []);
            console.log(res.data.data)
            setNumberOfCartItem(res.data.numOfCartItems || 0);
        } catch (error) {
            console.error('Error fetching cart:', error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    async function addToCart(productId) {
        try {
            setLoading(true);
            const res = await axios.post(apiUrl, { productId }, {
                headers: { token: localStorage.getItem('token') }
            });

            if (res.data.status === 'success') {
                toast.success('Product Added Successfully')
                setNumberOfCartItem(res.data.numOfCartItems);
            }

            fetchCart();
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong.")

        } finally {
            setLoading(false);
        }

    }

    async function getCartItems() {
        try {
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { token: localStorage.getItem('token') },
            });
            if (res.data.status === 'success') {
                setAllCartItems(res.data.data.products)
                setNumberOfCartItem(res.data.numOfCartItems)
                setCartId(res.data.cartId)
            }

        } catch (error) {
            console.log(error, "error");
        } finally {
        }
    }



    async function updateItemCount(id, count) {
        try {
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/67ae2b974a9040166a9afaba`, { count }, {
                headers: { token: localStorage.getItem('token') },
            })
            console.log(res);
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <CartContext.Provider value={{ cartItems, numberOfCartItem, loading, addToCart, getCartItems, updateItemCount, allCartItems, cartId }}>
            {children}
        </CartContext.Provider>
    );
}