import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import blog1 from "../../assets/images/blog-img-1.jpeg";
import blog2 from "../../assets/images/blog-img-2.jpeg";
import useCategories from "../../Hooks/useCategories";
import Error from "../Error/Error";
import { getAllProduct } from "../../api/products";

const Home = () => {
  const { allCategories, isCategoryLoading: catLoading } = useCategories();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProduct,
    refetchOnWindowFocus: false,
  });

  const allProductsData = data?.data?.data || [];

  // Show Loader while fetching data
  if (isLoading) {
    return (
      <div className="text-center w-full text-gray-600">
        <Loader />
      </div>
    );
  }

  // Show Error Message if API fails
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        <Error />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        {/* Slider Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5">
          <div className="md:col-span-3 rounded-lg overflow-hidden">
            <Swiper slidesPerView={1} loop={true} className="h-full">
              <SwiperSlide>
                <img
                  src={slider1}
                  className="w-full h-full object-cover"
                  alt="Slider 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={slider2}
                  className="w-full h-full object-cover"
                  alt="Slider 2"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="md:col-span-1 flex flex-col gap-4">
            <img
              src={blog1}
              className="h-1/2 w-full object-cover rounded-lg"
              alt="Blog 1"
            />
            <img
              src={blog2}
              className="h-1/2 w-full object-cover rounded-lg"
              alt="Blog 2"
            />
          </div>
        </div>

        {/* Categories Slider */}
        {!catLoading && (
          <Swiper
            slidesPerView={5}
            loop
            className="my-8"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {allCategories?.data?.data.map((cat) => (
              <SwiperSlide key={cat._id} className="text-center m-3 ">
                <img
                  src={cat.image}
                  className="h-[250px] w-full object-cover rounded-lg shadow-md"
                  alt={cat.name}
                />
                <div className="mt-2 font-medium text-gray-800">{cat.name}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {allProductsData.map((prod) => (
            <ProductCard product={prod} key={prod._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
