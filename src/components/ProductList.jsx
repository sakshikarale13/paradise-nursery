import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";

// Generic fallback if an external image fails
const fallbackImage =
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80";

const plants = [
  // ================= INDOOR PLANTS =================
  {
    id: 1,
    name: "Snake Plant",
    category: "Indoor Plants",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500&q=80",
  },
  {
    id: 2,
    name: "Monstera",
    category: "Indoor Plants",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500&q=80",
  },
  {
    id: 3,
    name: "Peace Lily",
    category: "Indoor Plants",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=500&q=80",
  },
  {
    id: 4,
    name: "ZZ Plant",
    category: "Indoor Plants",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&q=80",
  },
  {
    id: 5,
    name: "Rubber Plant",
    category: "Indoor Plants",
    price: 649,
    image:
      "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=500&q=80",
  },
  {
    id: 6,
    name: "Areca Palm",
    category: "Indoor Plants",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1632207691143-643e2b9a1f16?w=500&q=80",
  },

  // ================= FLOWERING PLANTS =================
  {
    id: 7,
    name: "Rose Plant",
    category: "Flowering Plants",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=500&q=80",
  },
  {
    id: 8,
    name: "Orchid",
    category: "Flowering Plants",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1566907225474-7d9f7e8d7b7d?w=500&q=80",
  },
  {
    id: 9,
    name: "Anthurium",
    category: "Flowering Plants",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=500&q=80",
  },
  {
    id: 10,
    name: "Jasmine Plant",
    category: "Flowering Plants",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80",
  },
  {
    id: 11,
    name: "Hibiscus",
    category: "Flowering Plants",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1597055181300-6f1c6b5f7a42?w=500&q=80",
  },
  {
    id: 12,
    name: "Lavender",
    category: "Flowering Plants",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500&q=80",
  },

  // ================= SUCCULENTS =================
  {
    id: 13,
    name: "Aloe Vera",
    category: "Succulents",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500&q=80",
  },
  {
    id: 14,
    name: "Echeveria",
    category: "Succulents",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80",
  },
  {
    id: 15,
    name: "Jade Plant",
    category: "Succulents",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500&q=80",
  },
  {
    id: 16,
    name: "Haworthia",
    category: "Succulents",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80",
  },
  {
    id: 17,
    name: "String of Pearls",
    category: "Succulents",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1631713019880-9e3f7d2b7f17?w=500&q=80",
  },
  {
    id: 18,
    name: "Zebra Haworthia",
    category: "Succulents",
    price: 379,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80",
  },
];

// ================= PLANT IMAGE =================

function PlantImage({ src, name }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <div style={styles.imageContainer}>
      {failed ? (
        <div style={styles.imagePlaceholder}>
          🌿
          <span>{name}</span>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          style={styles.image}
          onError={() => {
            if (imageSrc !== fallbackImage) {
              setImageSrc(fallbackImage);
            } else {
              setFailed(true);
            }
          }}
        />
      )}
    </div>
  );
}

// ================= PRODUCT LIST =================

function ProductList({ onHome, onCart }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // Calculate total quantity
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [
    "Indoor Plants",
    "Flowering Plants",
    "Succulents",
  ];

  // Add plant to Redux cart
  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  // Check if plant already exists in cart
  const isInCart = (id) => {
    return cartItems.some(
      (item) => item.id === id
    );
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
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
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
        <h1 style={styles.heading}>
          Our Plants
        </h1>

        <p style={styles.subtitle}>
          Discover beautiful plants for your
          home, office, and garden.
        </p>
      </header>

      {/* ================= CATEGORIES ================= */}

      {categories.map((category) => {
        const categoryPlants = plants.filter(
          (plant) =>
            plant.category === category
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

                    {/* Plant Image */}

                    <PlantImage
                      src={plant.image}
                      name={plant.name}
                    />

                    {/* Plant Information */}

                    <div
                      style={styles.cardContent}
                    >
                      <h3
                        style={styles.plantName}
                      >
                        {plant.name}
                      </h3>

                      <p style={styles.price}>
                        ₹{plant.price}
                      </p>

                      {/* Add to Cart Button */}

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

// ================= STYLES =================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f8f3",
    paddingBottom: "50px",
    fontFamily: "Arial, sans-serif",
  },

  // Navbar

  navbar: {
    minHeight: "70px",
    background: "#1b4332",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 6%",
    position: "sticky",
    top: 0,
    zIndex: 100,
    gap: "15px",
    flexWrap: "wrap",
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
    cursor: "pointer",
  },

  // Header

  header: {
    textAlign: "center",
    padding: "50px 20px 30px",
  },

  heading: {
    fontSize: "45px",
    color: "#1b4332",
    marginBottom: "12px",
  },

  subtitle: {
    fontSize: "17px",
    color: "#667085",
  },

  // Category

  categorySection: {
    maxWidth: "1200px",
    margin: "0 auto 55px",
    padding: "0 20px",
  },

  categoryTitle: {
    fontSize: "30px",
    color: "#1b4332",
    borderBottom: "3px solid #95d5b2",
    paddingBottom: "10px",
    marginBottom: "25px",
  },

  // Product Grid

  productGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
  },

  // Product Card

  card: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
    display: "flex",
    flexDirection: "column",
  },

  // Images

  imageContainer: {
    width: "100%",
    height: "210px",
    background: "#eaf3e9",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "20px",
    color: "#2d6a4f",
  },

  // Card Content

  cardContent: {
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  plantName: {
    fontSize: "19px",
    color: "#344054",
    margin: "0 0 10px",
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2d6a4f",
    margin: "10px 0 15px",
  },

  // Buttons

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
    marginTop: "auto",
  },

  disabledButton: {
    background: "#95d5b2",
    color: "#12372a",
    cursor: "not-allowed",
  },
};

export default ProductList;