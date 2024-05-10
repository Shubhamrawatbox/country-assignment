import './NavbarStyle.css'
import { useTheme } from '../../context/ThemeContext';
const Navbar = () => {
  const { initialTheme,toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${initialTheme === 'dark' ? 'dark' : 'light'}`}>
      <div className="logo">
      Where in the world?
      </div>
      <div className="mode-toggle">
        <span className="mode-label" onClick={toggleTheme}>Dark Mode</span>
      </div>
    </nav>
  );
};

export default Navbar;
