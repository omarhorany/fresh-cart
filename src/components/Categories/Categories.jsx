import React from "react";
import useCategories from "../../Hooks/useCategories";
import Loader from "../Loader/Loader";

const Categories = () => {
  const { allCategories, isCategoryLoading } = useCategories();

  if (isCategoryLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCategories?.data?.data.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={cat.image}
              className="w-full h-[250px] sm:h-[300px] object-cover"
              alt={cat.name}
            />
            <div className="text-center py-3 text-lg font-semibold text-gray-800">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
