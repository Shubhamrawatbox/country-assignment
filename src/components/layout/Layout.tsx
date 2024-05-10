
import { useTheme } from "../../context/ThemeContext";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }: any) => {
    const { initialTheme } = useTheme();

  return (
    <>
       <div className={`layout ${initialTheme}`}>
        <Navbar/>
        <div className="outer-container">
        {children}
        </div>
        </div>
    </>
  );
};

export default Layout;
