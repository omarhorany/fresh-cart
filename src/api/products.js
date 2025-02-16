import axios from "axios";

export function getAllProduct() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}
