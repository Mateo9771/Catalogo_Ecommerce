// src/components/AdminButtons/DeleteButton.jsx
import { useState } from "react";
import './CrudButtons.css';

const DeleteButton = ({ onConfirm, itemName = "este item", loading = false }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onConfirm();
    setShowConfirm(false);
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)} className="delete-btn" title="Eliminar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>

      {showConfirm && (
        <div className="confirm-modal-backdrop" onClick={() => setShowConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h4>¿Eliminar "{itemName}"?</h4>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button onClick={handleDelete} disabled={loading} className="confirm-delete">
                {loading ? "Eliminando..." : "Sí, eliminar"}
              </button>
              <button onClick={() => setShowConfirm(false)} className="cancel-delete">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;