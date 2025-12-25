// RemoveStockButton.jsx
import './CrudButtons.css';

const RemoveStockButton = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="stock-btn remove">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M1.5 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 1.5 8z"/>
    </svg>
  </button>
);

export default RemoveStockButton;