import { useState } from "react";
import "./Sidebar.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChevronRight, CurrencyRupee, PersonAddOutlined, Search } from "@mui/icons-material";
import Divider from '@mui/material/Divider';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Box } from "@mui/material";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`${isExpanded ? "sidebar-expanded" : "sidebar"}`}>
{/* toggler */}
      <Box className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRight />}
      </Box>
      {/* main content */}
      <div className="menu-items">
        <img src={isExpanded ? "https://jobs.weekday.works/_next/static/media/logo.268caeb2.png" :"https://jobs.weekday.works/_next/static/media/logo-small.08826abd.png"} className="logo" />

        <Divider orientation="horizontal" flexItem />
        <div className="get-jobs">
          <p>{isExpanded ? 'LOOKING FOR A JOB' : 'GET JOBS'}</p>
          <p>
          <Person2OutlinedIcon className="icon" />
           {isExpanded && 'My applied jobs'}
          </p>
          <p>
          <Search className="icon"/>
          {isExpanded && 'Search jobs'}
          </p>
          <p>
          <CurrencyRupee className="icon" />
          {isExpanded && 'Search salary'}
          </p>
          <p>
          <PersonAddOutlined className="icon" />
          {isExpanded && 'Ask for referral'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
