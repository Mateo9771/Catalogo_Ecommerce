import { useState } from "react";
import './ProductCount.css'

const ProductCount = ({ stock, initial = 1, onChange, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
      onChange && onChange(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      onChange && onChange(count - 1);
    }
  };

  const handleAdd = () => {
    if (onAdd) onAdd(count); 
  };

  return (
    <div className="product-count">
      <div className="counter">
        <button onClick={decrement} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button onClick={increment} disabled={count >= stock}>+</button>
      </div>
      <button className="add-btn" onClick={handleAdd} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCount;
