import { useState } from "react";
import "./Sidebar.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChevronRight } from "@mui/icons-material";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`${isExpanded ? "sidebar-expanded" : "sidebar"}`}>
      <div className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRight />}
      </div>
    </div>
  );
};

export default Sidebar;
