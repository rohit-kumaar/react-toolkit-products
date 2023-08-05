import React from "react";
import "./product.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Product() {
  const URL = "http://localhost:4000/products";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function ratingStar(rating) {
    const filledStar = Math.round(rating);
    return filledStar;
  }

  return (
    <>
      <main className="products">
        {products.map((product, index) => (
          <div className="product" key={product.id}>
            <img
              loading="lazy"
              src={product.thumbnail}
              alt={product.title}
              title={product.title}
            />
            <div>
              {product.brand} {product.title} {product.description}
            </div>

            <div className="product__rating">
              {Array(ratingStar(product.rating))
                .fill()
                .map((_) => (
                  <p>⭐</p>
                ))}
            </div>

            <div>Rating : {product.rating}</div>
          </div>
        ))}
      </main>
    </>
  );
}

export default Product;
