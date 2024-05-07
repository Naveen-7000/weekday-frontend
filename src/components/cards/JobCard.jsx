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
const JobCard = () => {
  const [expand,setIsExpand] = useState(false);
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
          <img
            src={
              "https://storage.googleapis.com/weekday-assets/airtableAttachment_1714542815382_7w5g1.jpg"
            }
          />
          <Box className="company-titles">
            <h5 className="main-title">FlexWash Technologies</h5>
            <h2 className="position-title">Senior Engineer</h2>
            <Typography variant="p" className="exp-title">
              India | Exp: 5-5 years
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
            Estimated Salary: ₹30 - 60 LPA ✅
          </Typography>
        </Box>
        <Box className={expand ? "jd-expand" : "jd"}>
          <p className="about-company">About Company:</p>
          <Box className="about-us">
            <p className="title">About us</p>
            <p className="description">
              Flex Wash is an operating system for the car wash industry. Our
              solutions help owners manage their operations and grow revenue.
              Our POS has a built-in CRM, allowing car washes to take advantage
              of their customer transaction history in order to funnel customers
              into subscriptions and higher margin wash packages..
              Flex Wash is an operating system for the car wash industry. Our
              solutions help owners manage their operations and grow revenue.
              Our POS has a built-in CRM, allowing car washes to take advantage
              of their customer transaction history in order to funnel customers
              into subscriptions and higher margin wash packages..
              
            </p>
          </Box>
        </Box>
        <Box className="job-footer">
          <Box className="expand-button" onClick={()=>{
            setIsExpand(!expand)
          }}>{expand ? 'Collapse' : "Expand"}</Box>
        </Box>
      </CardContent>
      <CardActions sx={{width:"100%"}}>
      <Box className="footer">
          {/* <Typography
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
           3 Years
          </Typography> */}
        <button className="apply-button" >⚡ Easy Apply</button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default JobCard;
