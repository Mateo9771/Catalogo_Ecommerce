// src/components/ProductListContainer/ProductListContainer.jsx
import { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import FilterButtons from "../Buttons/FilterButtons/FilterButtons";
import api from "../../api/axios.api";

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/products');
        const data = response.data;

        const adaptedProducts = data.map(product => ({
          _id: product.id,
          titulo: product.name,
          descripcion: product.description,
          precio: product.precio,
          stock: product.stock,
          imagenUrl: `http://localhost:3000${product.imageUrl}`,
          category: product.category, // Añadido: para filtrar
        }));

        setProducts(adaptedProducts);
        setFilteredProducts(adaptedProducts); // Mostrar todos al inicio
      } catch (err) {
        setError('Error al cargar los productos. Intenta más tarde.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // VERSIÓN CORREGIDA Y FINAL
  const handleFilter = (category) => {
    if (category === "all" || category === null) {
      // "todos" o al cargar la página → muestra TODOS los perfumes
      setFilteredProducts(products);
    } else {
      // Filtra por hombre o mujer
      setFilteredProducts(
        products.filter(product => product.category === category)
      );
    }
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">Cargando perfumes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h1 className="text-3xl font-bold text-center my-8">Nuestro Catálogo de Perfumes</h1>

      {/* Botones de filtro */}
      <FilterButtons onFilter={handleFilter} />

      {/* Lista de productos filtrados */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No hay perfumes en esta categoría aún.
        </p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductListContainer;