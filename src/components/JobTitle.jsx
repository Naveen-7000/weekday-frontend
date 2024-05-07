import { Badge } from "@mui/material";
import "../pages/searchJobs/SearchJob.css";

const JobTitle = ({jobsCount}) => {
  return (
    <Badge
      badgeContent={jobsCount}
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
