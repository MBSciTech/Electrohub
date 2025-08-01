import React, { useEffect, useState } from 'react';

const Cart = ({ onCartUpdate }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);

    localStorage.setItem('cart', JSON.stringify(cart));

    if (onCartUpdate) {
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      onCartUpdate(totalQty);
    }
  }, [cart, onCartUpdate]);

  const increment = (id) => {
    setCart(prev =>
      prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decrement = (id) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const remove = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">
        <i className="bi bi-cart-fill me-2"></i> Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th style={{ minWidth: '140px' }}>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ height: '60px', objectFit: 'contain', marginRight: '10px' }}
                        className="me-2"
                      />
                      {item.name}
                    </td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="btn-group gap-1">
                        <button className="btn btn-sm btn-outline-warning" onClick={() => decrement(item._id)}>
                          <i className="bi bi-dash-lg"></i>
                        </button>
                        <span className="btn btn-sm btn-light">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-warning" onClick={() => increment(item._id)}>
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => remove(item._id)}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end">
            <h4>Total: ₹{total.toFixed(2)}</h4>
            <button className="btn btn-success mt-2">
              <i className="bi bi-bag-check-fill me-2"></i> Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
