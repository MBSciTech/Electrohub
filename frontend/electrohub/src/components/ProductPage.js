import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON, but received something else.");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
      }
    };

    fetchProduct();
  }, [id]); 

  if (error) {
    return <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>{error}</div>;
  }

  if (!product) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading product...</div>;
  }

  return (
    <>
    <div style={styles.page}>
      <div style={styles.card}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.details}>
          <h2 style={styles.title}>{product.name}</h2>
          <p style={styles.price}>₹{product.price}</p>
          <p style={styles.description}>{product.description}</p>

          {/* New Fields */}
          <p style={styles.info}><strong>Rating:</strong> ⭐ {product.rating || "N/A"}</p>
          <p style={styles.info}><strong>Stock:</strong> {product.stock ?? "Unknown"} units available</p>

          {product.specs && product.specs.length > 0 && (
            <div style={styles.specs}>
              <strong>Specifications:</strong>
              <ul style={styles.specList}>
                {product.specs.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          <button style={styles.buttonCart}>Add to Cart</button>
          <br />
          <button style={styles.buttonBuy}>Buy now</button>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  card: {
    maxWidth: "800px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    gap: "20px",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    maxWidth: "350px",
    height: "auto",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#f2f2f2",
  },
  details: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "2rem",
    margin: "0 0 10px",
    color: "#333",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#27ae60",
  },
  description: {
    marginBottom: "15px",
    color: "#666",
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  info: {
    fontSize: "1rem",
    marginBottom: "10px",
    color: "#444",
  },
  specs: {
    marginBottom: "20px",
  },
  specList: {
    paddingLeft: "20px",
    color: "#444",
    fontSize: "0.95rem",
  },
  buttonCart: {
    padding: "12px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginBottom: "10px",
  },
  buttonBuy: {
    padding: "12px 20px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "#007bff",
    border: "1px solid #007bff",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default ProductPage;
