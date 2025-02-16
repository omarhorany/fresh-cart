import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data: allCategories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  return { allCategories, isCategoryLoading };
};

export default useCategories;
