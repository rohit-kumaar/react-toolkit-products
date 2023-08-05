import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./product.scss";
import { fetchAllProductsAsync, selectAllProducts } from "./productSlice";

function Product() {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  function ratingStar(rating) {
    const filledStar = Math.round(rating);
    return filledStar;
  }

  const DOLLAR_CURRENT_PRICE_IN_RUPEE = 82.68;

  function inRupee(dollar) {
    const rs = Math.round(dollar * DOLLAR_CURRENT_PRICE_IN_RUPEE);
    return rs;
  }

  function discountPrice(price, disPer) {
    const discountPri = inRupee((price * disPer) / 100);
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
          </div>
        ))}
      </main>
    </>
  );
}

export default Product;
