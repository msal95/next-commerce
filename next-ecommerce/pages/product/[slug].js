import Layout from "components/Layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import data from "utils/data";
import { Store } from "utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((item) => item.slug === slug);

  const addToCartHandler = () => {
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

  if (!product) {
    return (
      <h3 className="text-3xl font-bold text-red-600">Product Not Found</h3>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              Layout="responsive"
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
                {product.rating} of {product.numReviews} reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>$ {product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </div>
              </div>
              <button
                className="primary-button w-full"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
