import './NavbarStyle.css'
import { useTheme } from '../../context/ThemeContext';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";


const Navbar = () => {
  const { initialTheme,toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${initialTheme === 'dark' ? 'dark' : 'light'}`}>
      <div className="logo">
      Where in the world?
      </div>
      <div className="mode-toggle">
        {
          initialTheme === "light" ? 
          <MdOutlineDarkMode/> : <MdDarkMode/>
        }
        <span className="mode-label" onClick={toggleTheme}>Dark Mode</span>
      </div>
    </nav>
  );
};

export default Navbar;
