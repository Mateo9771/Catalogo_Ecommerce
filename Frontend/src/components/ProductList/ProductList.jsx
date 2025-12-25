import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
