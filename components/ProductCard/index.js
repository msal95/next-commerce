import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../../utils/Store";

const ProductCard = (props) => {
  const {
    id,
    name,
    brand,
    price,
    image,
    slug,
    category,
    rating,
    numOfReviews,
    countInStocks,
    description,
  } = props.data;

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((item) => item.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (countInStocks < quantity) {
      alert("Sorry, Product is out of Stock.");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...props.data, quantity } });
  };

  return (
    <div className="card" key={id}>
      <Link href={`/product/${slug}`}>
        <img src={image} alt={name} className="rounded shadow" />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${slug}`}>
          <h2 className="text-lg">{name}</h2>
        </Link>
        <p className="mb-2">{brand}</p>
        <p>$ {price}</p>
        <button
          type="button"
          className="primary-button"
          onClick={addToCartHandler}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
