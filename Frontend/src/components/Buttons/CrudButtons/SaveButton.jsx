import './CrudButtons.css';

const SaveButton = ({ loading = false, label = "Guardar Cambios" }) => {
  return (
    <button type="submit" disabled={loading} className="save-btn">
      {loading ? "Guardando..." : label}
    </button>
  );
};

export default SaveButton;