import './ProductCard.css'
import ProductCount from '../Buttons/ProductCount/ProductCount'
import { useCart } from '../CartContext/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleCountChange = (quantity) => {
    console.log(`Cantidad seleccionada de ${product.titulo}`, quantity)
  }
  
  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.imagenUrl} alt={product.titulo} className="product-img" />
      </div>
      
      <div className="product-content">
        <div className="product-info">
          <h3 className="product-title" title={product.titulo}>
            {product.titulo}
          </h3>
          <p className="product-description">
            {product.descripcion}
          </p>
          <div className="product-price-container">
            <span className="product-price">${product.precio}</span>
            {product.stock > 0 && (
              <span className="product-stock">{product.stock} disponibles</span>
            )}
          </div>
        </div>
        
        <div className="product-actions">
          <ProductCount 
            stock={product.stock} 
            onChange={handleCountChange} 
            onAdd={handleAddToCart}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard