import { Box } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Layout.css";
const Layout = ({ children }) => {
  return (
    <Box className="layout-container">
      <Sidebar />
      <Box className="content-container">
      {children}
      </Box>
    </Box>
  );
};

export default Layout;
