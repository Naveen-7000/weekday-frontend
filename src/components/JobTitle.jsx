import { Badge } from "@mui/material";
import "../pages/searchJobs/SearchJob.css";

const JobTitle = () => {
  return (
    <Badge
      badgeContent={48}
      color="primary"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="link-container">
        <p className="search-link">Search jobs</p>
      </div>
    </Badge>
  );
};

export default JobTitle;
