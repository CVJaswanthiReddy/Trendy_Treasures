import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

console.log("hello from ");
const ProductsByCategory = () => {
  const { categoryId } = useParams(); // Extract the categoryId from the URL
  const [products, setProducts] = useState([]);
  console.log("hello");
  useEffect(() => {
    console.log("useEffect called! Category ID:", categoryId);
    const fetchProducts = async () => {
      try {
        // Make a GET request with the categoryId as a query parameter
        const response = await axios.get(
          `http://localhost:3005/api/v1/products`
        );
        setProducts(response.data.products); // Set the fetched products in state
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Re-fetch products when the categoryId changes

  return (
    <div>
      <h1>Products in Category: {categoryId}</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default ProductsByCategory;
