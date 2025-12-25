import './CrudButtons.css';

const CancelButton = ({ onClick, label = "Cancelar" }) => {
  return (
    <button type="button" onClick={onClick} className="cancel-btn">
      {label}
    </button>
  );
};

export default CancelButton;