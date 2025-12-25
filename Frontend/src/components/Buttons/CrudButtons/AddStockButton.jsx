// AddStockButton.jsx
import './CrudButtons.css';

const AddStockButton = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="stock-btn add">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 1a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 1z"/>
      <path d="M1.5 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
  </button>
);

export default AddStockButton;