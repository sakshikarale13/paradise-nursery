import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";

// Reliable fallback image
const fallbackImage =
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80";

const plants = [
  // =========================
  // INDOOR PLANTS
  // =========================
  {
    id: 1,
    name: "Snake Plant",
    category: "Indoor Plants",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Monstera",
    category: "Indoor Plants",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Peace Lily",
    category: "Indoor Plants",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "ZZ Plant",
    category: "Indoor Plants",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Rubber Plant",
    category: "Indoor Plants",
    price: 649,
    image:
      "https://images.unsplash.com/photo-1603436326446-8e6e0c4b9b6e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Areca Palm",
    category: "Indoor Plants",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1632207691143-643e2b9a1f16?auto=format&fit=crop&w=600&q=80",
  },

  // =========================
  // FLOWERING PLANTS
  // =========================
  {
    id: 7,
    name: "Rose Plant",
    category: "Flowering Plants",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Orchid",
    category: "Flowering Plants",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1566907225474-7d9f7e8d7b7d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Anthurium",
    category: "Flowering Plants",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Jasmine Plant",
    category: "Flowering Plants",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "Hibiscus",
    category: "Flowering Plants",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1597055181300-6f1c6b5f7a42?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    name: "Lavender",
    category: "Flowering Plants",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=600&q=80",
  },

  // =========================
  // SUCCULENTS
  // =========================
  {
    id: 13,
    name: "Aloe Vera",
    category: "Succulents",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 14,
    name: "Echeveria",
    category: "Succulents",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 15,
    name: "Jade Plant",
    category: "Succulents",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 16,
    name: "Haworthia",
    category: "Succulents",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 17,
    name: "String of Pearls",
    category: "Succulents",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 18,
    name: "Zebra Haworthia",
    category: "Succulents",
    price: 379,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
  },
];

function ProductList({ onHome, onCart }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [
    "Indoor Plants",
    "Flowering Plants",
    "Succulents",
  ];

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  // If an image fails, automatically use fallback image
  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackImage;
  };

  return (
    <div style={styles.page}>

      {/* ================= NAVBAR ================= */}
      <nav style={styles.navbar}>

        <div
          style={styles.logo}
          onClick={onHome}
        >
          🌿 Paradise Nursery
        </div>

        <div style={styles.navLinks}>

          <button
            style={styles.navButton}
            onClick={onHome}
          >
            Home
          </button>

          <button
            style={styles.navButton}
          >
            Plants
          </button>

          <button
            style={styles.cartButton}
            onClick={onCart}
          >
            🛒 Cart ({cartCount})
          </button>

        </div>
      </nav>

      {/* ================= HEADER ================= */}
      <header style={styles.header}>

        <h1 style={styles.mainTitle}>
          Our Plants
        </h1>

        <p style={styles.subtitle}>
          Discover beautiful plants for your home, office, and garden.
        </p>

      </header>

      {/* ================= CATEGORIES ================= */}
      {categories.map((category) => {

        const categoryPlants = plants.filter(
          (plant) => plant.category === category
        );

        return (
          <section
            key={category}
            style={styles.categorySection}
          >

            <h2 style={styles.categoryTitle}>
              {category}
            </h2>

            <div style={styles.productGrid}>

              {categoryPlants.map((plant) => {

                const added = isInCart(plant.id);

                return (
                  <div
                    style={styles.card}
                    key={plant.id}
                  >

                    {/* Product Image */}
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={styles.image}
                      onError={handleImageError}
                    />

                    {/* Product Information */}
                    <div style={styles.cardContent}>

                      <h3 style={styles.productName}>
                        {plant.name}
                      </h3>

                      <p style={styles.price}>
                        ₹{plant.price}
                      </p>

                      <button
                        style={{
                          ...styles.addButton,
                          ...(added
                            ? styles.disabledButton
                            : {}),
                        }}
                        onClick={() =>
                          handleAddToCart(plant)
                        }
                        disabled={added}
                      >
                        {added
                          ? "✓ Added to Cart"
                          : "Add to Cart"}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          </section>
        );
      })}

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f5f8f3",
    paddingBottom: "60px",
  },

  /* Navbar */
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
    whiteSpace: "nowrap",
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
    cursor: "pointer",
  },

  /* Header */
  header: {
    textAlign: "center",
    padding: "55px 20px 30px",
  },

  mainTitle: {
    fontSize: "52px",
    margin: "0 0 15px",
    color: "#111",
  },

  subtitle: {
    fontSize: "17px",
    color: "#52616b",
    margin: 0,
  },

  /* Category */
  categorySection: {
    maxWidth: "1200px",
    margin: "0 auto 60px",
    padding: "0 20px",
  },

  categoryTitle: {
    fontSize: "30px",
    textAlign: "center",
    color: "#12372a",
    borderBottom: "2px solid #95d5b2",
    paddingBottom: "10px",
    marginBottom: "25px",
  },

  /* Product Grid */
  productGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
  },

  /* Product Card */
  card: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease",
  },

  /* Image */
  image: {
    width: "100%",
    height: "210px",
    objectFit: "cover",
    display: "block",
    background: "#eef3ee",
  },

  /* Content */
  cardContent: {
    padding: "18px",
    textAlign: "center",
  },

  productName: {
    margin: "0 0 10px",
    fontSize: "19px",
    color: "#17324d",
  },

  price: {
    fontSize: "19px",
    fontWeight: "bold",
    color: "#167a56",
    margin: "10px 0 15px",
  },

  /* Add button */
  addButton: {
    width: "100%",
    padding: "11px",
    border: "none",
    borderRadius: "7px",
    background: "#2d6a4f",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  /* Added button */
  disabledButton: {
    background: "#95d5b2",
    color: "#12372a",
    cursor: "not-allowed",
  },
};

export default ProductList;