import { Link } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import "./CartButton.css";

const CartButton = () => {
  const {cart} = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" className="cart-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="cart-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 2.25h2.25l2.25 12.75h12.75l2.25-9H6.75m0 0L5.25 4.5M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </Link>
  );
};

export default CartButton;
