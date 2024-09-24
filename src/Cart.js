import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const uid = localStorage.getItem('uid'); // Replace with actual user ID

  useEffect(() => {
    // Fetch cart data from API using GET request
    axios
      .post(`https://akashsir.in/myapi/atecom1/api/api-list-cart.php?user_id=${uid}`)
      .then((response) => {
        setCartItems(response.data.cart_list);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, [uid]);

  // Handle delete item from cart
  const handleDelete = (cart_id) => {
    setCartItems(cartItems.filter((item) => item.cart_id !== cart_id));
    // Optionally, make a DELETE API request here to update backend
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product_qty * item.product_price,
      0
    );
  };

  return (
    <>
      <p className='text-center fs-2 mt-2' style={{ fontWeight: "500", color: '#FF7B00' }}>❆ Cart List ❆</p>
      <div className="container">
        <h2 className="my-4">Cart List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Srno</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Product Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.cart_id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    style={{ width: "60px", height: "60px" }}
                  />
                </td>
                <td>{item.product_name}</td>
                <td>
                  <input
                    type="number"
                    value={item.product_qty}
                    min="1"
                    onChange={(e) => {
                      const newQty = e.target.value;
                      setCartItems((prevItems) =>
                        prevItems.map((i) =>
                          i.cart_id === item.cart_id
                            ? { ...i, product_qty: newQty }
                            : i
                        )
                      );
                    }}
                    style={{ width: "60px" }}
                  />
                </td>
                <td>Rs. {item.product_price}</td>
                <td>Rs. {item.product_qty * item.product_price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.cart_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="text-right font-weight-bold">
                Grand Total
              </td>
              <td>Rs. {calculateTotal()}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary mr-2">Proceed to Checkout</button>
        <button className="btn btn-secondary">Back to Shop</button>
      </div>
    </>
  );
};

export default Cart;
