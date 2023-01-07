import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "utils/Store";

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const addProductToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("Sorry, Product is Out of Stock.");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    router.push("/cart");
  };
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={addProductToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
