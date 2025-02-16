import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';

export default function Order() {
    const [paymentWay, setPaymentWay] = useState()
    const { cartId } = useContext(CartContext)
    function handleSubmit(values) {
        console.log(values);
        if (paymentWay == 'cash') {
            cashOrder(values)
        } else if (paymentWay == 'visa') {
            visaOrder()
        }
    }
    async function cashOrder(values) {
        console.log("cash");
        try {
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, values, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    function visaOrder() {
        console.log("visa");
    }
    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        },
        onSubmit: handleSubmit
    });

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md my-10">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Order Form</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-2">
                {/* Details Input */}
                <div>
                    <label htmlFor="details" className="block text-lg font-medium text-gray-700 capitalize">Details</label>
                    <input
                        onChange={() => formik.setFieldValue('shippingAddress.details', e.targer.value)}
                        value={formik.values.details}
                        type="text"
                        name="details"
                        id="details"
                        placeholder="Enter order details"
                        className="mt-2 block w-full px-4 py-3 text-lg border rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                    />
                </div>
                {/* Phone Input */}
                <div>
                    <label htmlFor="phone" className="block text-lg font-medium text-gray-700 capitalize">Phone</label>
                    <input
                        onChange={() => formik.setFieldValue('shippingAddress.phone', e.targer.value)}
                        value={formik.values.phone}
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Enter phone number"
                        className="mt-2 block w-full px-4 py-3 text-lg border rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                    />
                </div>
                {/* City Input */}
                <div className='mb-5'>
                    <label htmlFor="city" className="block text-lg font-medium text-gray-700 capitalize">City</label>
                    <input
                        onChange={() => formik.setFieldValue('shippingAddress.city', e.targer.value)}
                        value={formik.values.city}
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter city name"
                        className="mt-2 mb-5 block w-full px-4 py-3 text-lg border rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={() => setPaymentWay('cash')}
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 mt-5 focus:ring-green-500 focus:ring-offset-2">
                    Cash Order
                </button>
                <button
                    onClick={() => setPaymentWay('visa')}
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Visa Order
                </button>
            </form>
        </div>
    );
}
