import './HamburgerButton.css';

const HamburgerButton = ({ menuOpen, toggleMenu }) => {
  return (
    <div 
      className={`hamburger ${menuOpen ? "active" : ""}`} 
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerButton;