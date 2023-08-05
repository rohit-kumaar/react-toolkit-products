import productUrl from "../../config/urlPath";

const PRODUCT_URL = "http://localhost:4000/products";

export default async function productAPI() {
  const res = await fetch(PRODUCT_URL);
  const data = await res.json();
  return data;
}
