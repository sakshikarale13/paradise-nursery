import { useState } from "react";
import "./App.css";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

function App() {
  const [page, setPage] = useState("home");

  if (page === "plants") {
    return (
      <ProductList
        onHome={() => setPage("home")}
        onCart={() => setPage("cart")}
      />
    );
  }

  if (page === "cart") {
    return (
      <CartItem
        onHome={() => setPage("home")}
        onPlants={() => setPage("plants")}
      />
    );
  }

  return (
    <>
      <div className="landing-page">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>

          <p>
            Bring nature into your home with beautiful, healthy and
            carefully selected houseplants.
          </p>

          <button
            className="get-started-btn"
            onClick={() => setPage("plants")}
          >
            Get Started
          </button>
        </div>
      </div>

      <AboutUs />
    </>
  );
}

export default App;