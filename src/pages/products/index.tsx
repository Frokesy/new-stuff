import { useState, useEffect } from "react";
import MainContainer from "../../components/containers/MainContainer";

const ProductsCatalogue = () => {
  const [data, setData] = useState({
    name: "Test Data",
    active: true,
    description: "Test Description",
    default_price_data: {
      currency: "USD",
      unit_amount: 5000,
    },
  });
  const createProduct = async () => {
    await fetch("http://localhost:4000/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: data }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  };

  const fetchAllProducts = async () => {
    await fetch("http://localhost:4000/fetch-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <MainContainer active="products">
      <h2>Products Catalogue</h2>
      <button className="create-product" onClick={createProduct}>
        Create Product
      </button>
    </MainContainer>
  );
};

export default ProductsCatalogue;
