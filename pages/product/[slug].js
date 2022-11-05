import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { DATA } from "../../utils/data";
import { Store } from "../../utils/Store";

const ProductScreen = (props) => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = DATA.find((product) => {
    return product.slug === slug;
  });

  const addtoCartHandler = () => {
    const existItem = state.cart.cartItems.find((item) => item.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStocks < quantity) {
      alert("Sorry, Product is out of Stock.");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  if (!product) {
    return (
      <>
        <h2>Product Not Found</h2>
      </>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back To Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md: gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numOfReviews} reviews
            </li>
            <li>Description: {product.description} </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="flex mb-2 justify-between">
              <div>Price: </div>
              <div>${product.price}</div>
            </div>
            <div className="flex mb-2 justify-between">
              <div>Status: </div>
              <div>
                {product.countInStocks > 0 ? "In Stock" : "Unavailable"}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addtoCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
