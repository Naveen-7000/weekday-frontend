import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import "./Card.css";
import { useState } from "react";
const JobCard = ({
  logoUrl,
  companyName,
  jobRole,
  minExp,
  maxExp,
  location,
  salaryCurrencyCode,
  minJdSalary,
  maxJdSalary,
  jobDetailsFromCompany,
  jdLink
}) => {
  const [expand, setIsExpand] = useState(false);
  return (
    <Card className="card-container">
      <CardContent>
        <Chip
          label={`⏳ Posted 6 days ago`}
          variant="outlined"
          size="small"
          className="published-date"
        />
        <Box className="company-profile">
          <img src={logoUrl} />
          <Box className="company-titles">
            <h5 className="main-title">{companyName}</h5>
            <h2 className="position-title">{jobRole}</h2>
            <Typography variant="p" className="exp-title">
              {location} | Exp: {minExp ? minExp : '0'} - {maxExp} years
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="p"
            sx={{ mb: 2 }}
            color="text.secondary"
            className="salary-title"
          >
            Estimated Salary: {minJdSalary} - {maxJdSalary} {salaryCurrencyCode}{" "}
            ✅
          </Typography>
        </Box>
        <Box className={expand ? "jd-expand" : "jd"}>
          <p className="about-company">About Company:</p>
          <Box className="about-us">
            <p className="title">About us</p>
            <p className="description">{jobDetailsFromCompany}</p>
          </Box>
        </Box>
        <Box className="job-footer">
          <Box
            className="expand-button"
            onClick={() => {
              setIsExpand(!expand);
            }}
          >
            {expand ? "Collapse" : "Expand"}
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ width: "100%" }}>
        <Box className="footer">
          <Typography
            variant="p"
            sx={{display:'block' }}
            color="text.secondary"
            className="salary-title"
          >
            Minimum Experience
          </Typography>
          <Typography
            variant="p"
            sx={{ pt:1,display:'block' }}
            className="salary-title"
          >
           {minExp ? minExp : '0'} Years
          </Typography>
          <button className="apply-button">⚡ Easy Apply</button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default JobCard;
