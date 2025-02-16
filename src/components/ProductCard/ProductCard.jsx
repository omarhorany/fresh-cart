import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function ProductCard(props) {
    const { addToCart } = useContext(CartContext)
    const { imageCover, price, ratingsAverage, description, title, _id } = props.product;
    const rating = Math.floor(ratingsAverage);
    const maxLength = 50;
    const titleMaxLength = 10;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col m-3">
            <Link to={`/details/${_id}`}>
                <div>
                    <img className="p-4 h-[400px] w-full object-cover rounded-t-lg" src={imageCover} alt="product image" />
                </div>
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                        {title.length > titleMaxLength ? title.slice(0, titleMaxLength) + "..." : title}
                    </h5>
                </div>
            </Link>

            <div className="h-[60px] overflow-hidden px-5">
                <p className="text-md text-gray-700">
                    {description.length > maxLength ? description.slice(0, maxLength) + "..." : description}
                </p>
            </div>

            <div className="flex items-center mt-2.5 mb-5 px-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {Array.from({ length: rating }, (_, index) => (
                        <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                </div>
                <div className="flex items-center justify-between w-full">
                    <div>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-green-200 dark:text-green-800">
                            {ratingsAverage}
                        </span>
                    </div>
                    <div>
                        <span className="text-3xl font-bold text-gray-900">${price}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <button onClick={() => addToCart(_id)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">
                    Add to cart
                </button>
            </div>
        </div>
    );
}
