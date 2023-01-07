import Layout from "components/Layout/Layout";
import Link from "next/link";
import React, { useContext } from "react";
import { XCircle } from "@heroicons/react/outline";

import { Store } from "utils/Store";
import Image from "next/image";
import dynamic from "next/dynamic";

function CartScreen() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);

    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItem = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <Layout title="Shopping  Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty: <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md: col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <td className="px-5 text-left">Item</td>
                  <td className="px-5 text-center">Quantity</td>
                  <td className="px-5 text-center">Price</td>
                  <td className="px-5 text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="border-b" key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-center">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((count) => (
                          <option key={count + 1}>{count + 1}</option>
                        ))}
                      </select>
                    </td>
                    {/* <td className="p-5 text-center">{item.quantity}</td> */}
                    <td className="p-5 text-center">$ {item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItem(item)}>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
