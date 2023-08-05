import { PRODUCT_API as api } from "../../config/urlPath";

async function fetchAllProducts() {
  try {
    const res = await fetch(api);
    const data = await res.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
}

export default fetchAllProducts;
