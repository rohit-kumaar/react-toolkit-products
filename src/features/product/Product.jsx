import axios from "axios";
import React, { useEffect, useState } from "react";
import "./product.scss";

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
    const rs = (dollar * DOLLAR_CURRENT_PRICE_IN_RUPEE).toFixed(0);
    return rs;
  }

  function discountPrice(price, disPer) {
    const discountPri = inRupee(((price * disPer) / 100).toFixed(0));
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
          <div className="product" key={product.id + index}>
            <div className="img-wrapper">
              <img
                loading="lazy"
                src={product.thumbnail}
                alt={product.title}
                title={product.title}
              />
            </div>
            <div>
              {product.brand} {product.title} {product.description}
            </div>

            <div className="product__rating">
              {Array(ratingStar(product.rating))
                .fill()
                .map((_, index) => (
                  <p key={index}>⭐</p>
                ))}
            </div>

            <div className="product__price">
              <span className="rupee-symbol"> ₹</span>
              <span className="actual-price">
                {actualPrice(product.price, product.discountPercentage)}
              </span>
              <div>
                M.R.P:
                <del>
                  ₹{discountPrice(product.price, product.discountPercentage)}
                </del>
                (<span>{product.discountPercentage}% off</span>)
              </div>
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
