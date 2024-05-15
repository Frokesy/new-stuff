import MainContainer from "../../components/containers/MainContainer";

const createProduct = async () => {
  await fetch("http://localhost:4000/create-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const ProductsCatalogue = () => {
  return (
    <MainContainer active="products">
      <h2>Products Catalogue</h2>
      <button className="create-produc" onClick={createProduct}>
        Create Product
      </button>
    </MainContainer>
  );
};

export default ProductsCatalogue;
