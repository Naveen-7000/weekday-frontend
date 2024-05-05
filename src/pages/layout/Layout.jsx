import Sidebar from "../../components/sidebar/Sidebar";
import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
