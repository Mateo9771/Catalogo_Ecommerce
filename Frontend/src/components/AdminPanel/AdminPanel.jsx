// src/components/AdminPanel/AdminPanel.jsx
import { useState, useEffect } from "react";
import "./AdminPanel.css";
import api from "../../api/axios.api";
import DeleteButton from "../Buttons/CrudButtons/DeleteButton";
import EditButton from "../Buttons/CrudButtons/EditButton";
import SaveButton from "../Buttons/CrudButtons/SaveButton";
import CancelButton from "../Buttons/CrudButtons/CancelButton";
import ActionButtonsGroup from "../Buttons/CrudButtons/ActionButtonsGroup";

const AdminPanel = ({ type }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para el formulario de creación
  const [createForm, setCreateForm] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: null,
    color: "#ffffff",
    category: "hombre",
  });

  // Estados para el modal de edición
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchItems();
  }, [type]);

  const fetchItems = async () => {
    try {
      const endpoint = type === "products" ? "/products" : "/sliders";
      const res = await api.get(endpoint);
      const data = res.data;

      const adapted = data.map(item => ({
        id: item.id,
        titulo: type === "products" ? item.name : item.title,
        descripcion: item.description,
        precio: item.precio,
        stock: item.stock,
        imagenUrl: `http://localhost:3000${item.imageUrl}`,
        color: item.color || "#ffffff",
        category: item.category,
      }));

      setItems(adapted);
    } catch (err) {
      setError("Error al cargar los items");
      console.error(err);
    }
  };

  // === CREAR NUEVO ITEM ===
  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData();
    form.append(type === "products" ? "name" : "title", createForm.titulo);
    form.append("description", createForm.descripcion);
    if (type === "products") {
      form.append("precio", createForm.precio);
      form.append("stock", createForm.stock);
      form.append("category", createForm.category);
    }
    if (createForm.imagen) form.append("image", createForm.imagen);

    try {
      const endpoint = type === "products" ? "/products" : "/sliders";
      const res = await api.post(endpoint, form);
      await fetchItems();
      setCreateForm({
        titulo: "", descripcion: "", precio: "", stock: "", imagen: null,
        color: "#ffffff", category: "hombre"
      });
      alert("¡Creado con éxito!");
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear");
    } finally {
      setLoading(false);
    }
  };

  // === ABRIR MODAL DE EDICIÓN ===
  const openEditModal = (item) => {
    setEditingItem(item);
    setEditForm({
      titulo: item.titulo,
      descripcion: item.descripcion,
      precio: item.precio || "",
      stock: item.stock || "",
      color: item.color,
      category: item.category || "hombre",
      imagen: null,
    });
  };

  // === GUARDAR EDICIÓN ===
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append(type === "products" ? "name" : "title", editForm.titulo);
    form.append("description", editForm.descripcion);
    if (type === "products") {
      form.append("precio", editForm.precio);
      form.append("stock", editForm.stock);
      form.append("category", editForm.category);
    }
    if (editForm.imagen) form.append("image", editForm.imagen);

    try {
      const endpoint = type === "products" ? `/products/${editingItem.id}` : `/sliders/${editingItem.id}`;
      await api.put(endpoint, form);
      await fetchItems();
      setEditingItem(null);
      alert("¡Actualizado con éxito!");
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  // === ELIMINAR ITEM ===
  const handleDelete = async (id) => {
    try {
      const endpoint = type === "products" ? `/products/${id}` : `/sliders/${id}`;
      await api.delete(endpoint);
      await fetchItems();
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="admin-panel">
      <h3>{type === "products" ? "Gestión de Productos" : "Gestión de Sliders"}</h3>
      {error && <p className="error-msg">{error}</p>}

      {/* FORMULARIO DE CREACIÓN */}
      <form onSubmit={handleCreate} className="form-container">
        <input type="text" placeholder="Título" value={createForm.titulo}
          onChange={(e) => setCreateForm({ ...createForm, titulo: e.target.value })} required disabled={loading} />
        <textarea placeholder="Descripción" value={createForm.descripcion}
          onChange={(e) => setCreateForm({ ...createForm, descripcion: e.target.value })} required disabled={loading} />

        {type === "products" && (
          <>
            <input type="number" placeholder="Precio" value={createForm.precio}
              onChange={(e) => setCreateForm({ ...createForm, precio: e.target.value })} required disabled={loading} />
            <input type="number" placeholder="Stock" value={createForm.stock}
              onChange={(e) => setCreateForm({ ...createForm, stock: e.target.value })} required disabled={loading} />
            <select value={createForm.category}
              onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })} disabled={loading}>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </>
        )}

        {type === "sliders" && (
          <input type="color" value={createForm.color}
            onChange={(e) => setCreateForm({ ...createForm, color: e.target.value })} disabled={loading} />
        )}

        <input type="file" accept="image/*"
          onChange={(e) => setCreateForm({ ...createForm, imagen: e.target.files[0] })} disabled={loading} />

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : `+ Agregar ${type === "products" ? "Producto" : "Slider"}`}
        </button>
      </form>

      {/* LISTADO CON ACCIONES */}
      {items.length > 0 && (
        <div className="preview">
          <h3>{type === "products" ? "Productos" : "Sliders"} Cargados</h3>
          <div className="preview-grid">
            {items.map((item) => (
              <div key={item.id} className="preview-card">
                <img src={item.imagenUrl} alt={item.titulo} className="preview-img"
                  onError={(e) => { e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wMDFDIq5U0zRwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUAAAAASUVORK5CYII='; }} />
                <h4>{item.titulo}</h4>
                <p>{item.descripcion}</p>
                {type === "products" && (
                  <>
                    <span className="price">${item.precio}</span>
                    <span className="stock">Stock: {item.stock}</span>
                    <span className="category-badge">{item.category}</span>
                  </>
                )}
                {type === "sliders" && <div className="color-preview" style={{ backgroundColor: item.color }} />}

                {/* BOTONES DE ACCIÓN */}
                <ActionButtonsGroup>
                  <EditButton onClick={() => openEditModal(item)} />
                  <DeleteButton
                    onConfirm={() => handleDelete(item.id)}
                    itemName={item.titulo}
                  />
                </ActionButtonsGroup>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN */}
      {editingItem && (
        <div className="modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar {type === "products" ? "Producto" : "Slider"}</h3>
            <form onSubmit={handleUpdate}>
              <input type="text" value={editForm.titulo}
                onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })} required />
              <textarea value={editForm.descripcion}
                onChange={(e) => setEditForm({ ...editForm, descripcion: e.target.value })} required />

              {type === "products" && (
                <>
                  <input type="number" value={editForm.precio}
                    onChange={(e) => setEditForm({ ...editForm, precio: e.target.value })} required />
                  <input type="number" value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })} required />
                  <select value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                  </select>
                </>
              )}

              {type === "sliders" && (
                <input type="color" value={editForm.color}
                  onChange={(e) => setEditForm({ ...editForm, color: e.target.value })} />
              )}

              <input type="file" accept="image/*"
                onChange={(e) => setEditForm({ ...editForm, imagen: e.target.files[0] })} />

              <div className="modal-actions">
                <SaveButton loading={loading} />
                <CancelButton onClick={() => setEditingItem(null)} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;