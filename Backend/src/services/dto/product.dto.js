// Backend/src/services/dtos/product.dto.js
class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.name = product.name;
    this.description = product.description;
    this.precio = product.precio;
    this.stock = product.stock;
    this.imageUrl = product.imageUrl;
    this.category = product.category;
  }
}

export default ProductDTO;