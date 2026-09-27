import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";

function CartItem({ onHome, onPlants }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout Coming Soon!");
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={onHome}>
          🌿 Paradise Nursery
        </div>

        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={onHome}>
            Home
          </button>

          <button style={styles.navButton} onClick={onPlants}>
            Plants
          </button>

          <button style={styles.cartButton}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {/* Cart Header */}
      <div style={styles.header}>
        <h1>Shopping Cart</h1>
        <p>Review your selected plants before checkout.</p>
      </div>

      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <h2>Your cart is empty 🌱</h2>
          <p>Add some beautiful plants to your cart.</p>

          <button style={styles.continueButton} onClick={onPlants}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={styles.container}>
          {/* Cart Items */}
          <div style={styles.itemsContainer}>
            {cartItems.map((item) => (
              <div style={styles.item} key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.image}
                />

                <div style={styles.itemDetails}>
                  <h2>{item.name}</h2>

                  <p style={styles.unitPrice}>
                    Unit Price: ₹{item.price}
                  </p>

                  <div style={styles.quantityRow}>
                    <button
                      style={styles.quantityButton}
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      −
                    </button>

                    <span style={styles.quantity}>
                      {item.quantity}
                    </span>

                    <button
                      style={styles.quantityButton}
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>
                  </div>

                  <p style={styles.itemTotal}>
                    Total: ₹{item.price * item.quantity}
                  </p>

                  <button
                    style={styles.deleteButton}
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div style={styles.summary}>
            <h2>Order Summary</h2>

            <div style={styles.summaryRow}>
              <span>Total Items:</span>
              <strong>{cartCount}</strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Total Amount:</span>
              <strong>₹{totalAmount}</strong>
            </div>

            <button
              style={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <button
              style={styles.continueButton}
              onClick={onPlants}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f8f3",
    paddingBottom: "60px",
  },

  navbar: {
    height: "70px",
    background: "#1b4332",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 6%",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    fontSize: "23px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  navLinks: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  navButton: {
    background: "transparent",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
  },

  cartButton: {
    background: "#74c69d",
    color: "#12372a",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "16px",
    fontWeight: "bold",
  },

  header: {
    textAlign: "center",
    padding: "45px 20px 30px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
  },

  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  item: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    gap: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  image: {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  itemDetails: {
    flex: 1,
  },

  unitPrice: {
    color: "#555",
  },

  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "15px 0",
  },

  quantityButton: {
    width: "35px",
    height: "35px",
    border: "none",
    borderRadius: "6px",
    background: "#2d6a4f",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
  },

  quantity: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  itemTotal: {
    fontWeight: "bold",
    color: "#2d6a4f",
  },

  deleteButton: {
    border: "none",
    background: "#d62828",
    color: "white",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  summary: {
    background: "white",
    borderRadius: "12px",
    padding: "25px",
    height: "fit-content",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
    fontSize: "17px",
  },

  checkoutButton: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "7px",
    background: "#2d6a4f",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "12px",
  },

  continueButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "7px",
    background: "#95d5b2",
    color: "#12372a",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  emptyCart: {
    textAlign: "center",
    padding: "80px 20px",
  },
};

export default CartItem;