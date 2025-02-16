import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const fetchProductDetails = async (id) => {
    const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    return data.data;
};

const ProductDetails = () => {
    const { id } = useParams();

    // Fetch product details using React Query
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["productDetails", id],
        queryFn: () => fetchProductDetails(id),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <div className="text-center w-full text-gray-600">
                <Loader />
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="text-center py-10 text-red-500">
                <Error />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
                {/* Product Image */}
                <div className="flex justify-center">
                    <img
                        className="rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md object-cover"
                        src={product.imageCover}
                        alt={product.title}
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {product.title}
                    </h1>
                    <p className="text-gray-700 text-sm sm:text-base">{product.description}</p>

                    {/* Ratings */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.round(product.ratingsAverage) }, (_, index) => (
                            <svg
                                key={index}
                                className="w-5 h-5 text-yellow-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 22 20"
                                fill="currentColor"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                        <span className="text-gray-800 font-semibold">
                            {product.ratingsAverage.toFixed(1)}
                        </span>
                    </div>

                    {/* Price & Buy Button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <span className="text-xl sm:text-2xl font-semibold text-green-600">
                            ${product.price}
                        </span>
                    </div>
                    <button className="bg-blue-600 w-full hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;