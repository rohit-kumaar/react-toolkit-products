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

  const DOLLAR_CURRENT_PRICE_IN_RUPEE = 82.68;

  function inRupee(dollar) {
    const rs = (dollar * DOLLAR_CURRENT_PRICE_IN_RUPEE).toFixed(2);
    return rs;
  }

  function discountPrice(price, disPer) {
    const discountPri = ((price * disPer) / 100).toFixed(2);
    return discountPri;
  }

  function actualPrice(price, disPer) {
    const realPrice = inRupee(price) - discountPrice(price, disPer);
    return realPrice;
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

            <div className="product__price">
              ₹ {actualPrice(product.price, product.discountPercentage)}
              M.R.P:
              <del>
                ₹{discountPrice(product.price, product.discountPercentage)}
              </del>
              <span>{product.discountPercentage}% off</span>
            </div>
            {/* <div className="product__price">
              ₹ price - (price * discountPercentage)/100 M.R.P:
              <del>₹ (price * discountPercentage)/100</del>
              <span>(discountPercentage% off)</span>
            </div> */}
          </div>
        ))}
      </main>
    </>
  );
}

export default Product;
