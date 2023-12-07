import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./product.scss";
import { fetchAllProductsAsync, selectAllProducts } from "./productSlice";

function Product() {
  const productsData = useSelector(selectAllProducts);
  const dispatch = useDispatch();

  const products = productsData.products;

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
        {products?.map((product, index) => (
          <div className="product" key={product.id + index}>
            <Link to="#" className="img-wrapper">
              <img
                loading="lazy"
                src={product.thumbnail}
                alt={product.title}
                title={product.title}
              />
            </Link>

            <Link to="#" className="product__desc">
              {product.brand} {product.title} {product.description}
            </Link>

            <div className="product__rating">
              {Array(ratingStar(product.rating))
                .fill()
                .map((_, index) => (
                  <p key={index}>⭐</p>
                ))}
            </div>

            <Link to="#" className="product__price">
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
            </Link>
          </div>
        ))}
      </main>
    </>
  );
}

export default Product;
