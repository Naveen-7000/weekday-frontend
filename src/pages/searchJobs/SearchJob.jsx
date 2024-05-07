// import { addJobs } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, OutlinedInput, Typography } from "@mui/material";
import JobTitle from "../../components/JobTitle";
import AutoComplete from "../../components/autocomplete/AutoComplete";
import "./SearchJob.css";
import {
  addJobs,
  addTotalPages,
  updateFilterOptions,
} from "../../redux/actions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filters } from "../../utils/filtersData";
import JobCard from "../../components/cards/JobCard";

const SearchJob = () => {
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.filters.filters);
  const { jobs, totalPages } = useSelector((state) => state.jobs);

  // Memoize whether any role option is selected
  const isRoleSelected = useMemo(
    () => appliedFilters.roles.length > 0,
    [appliedFilters.roles]
  );

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(addJobs(result?.jdList));
        dispatch(addTotalPages(result?.totalCount));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCompanyNameChange = (e) => {
    let name = e.target.value;
    setCompanyName(name);
    dispatch(updateFilterOptions({ filterType: "companyName", options: name }));
  };

  const filteredJobs = useMemo(() => {
    // Apply filters here
    return jobs.filter((job) => {
      // Example: Filtering based on experience
      if (
        appliedFilters.experience.length > 0 &&
        !appliedFilters.experience.some(
          (exp) => exp.value === job?.minExp?.toString()
        )
      ) {
        return false;
      }
      // Apply other filters similarly
      return true;
    });
  }, [jobs, appliedFilters]);

  console.log("filtered jobs", filteredJobs);
  console.log("applied filters", appliedFilters);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "24px",
        gap: "12px",
      }}
    >
      <JobTitle />
      {/* filter */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          marginTop: "10px",
        }}
      >
        {filters.map((filter) => (
          <Box
            key={filter.id}
            sx={{
              position: "relative",
              // padding: "8px 4px",
            }}
          >
            {filter.id === "techStacks" && !isRoleSelected ? null : (
              <AutoComplete
                id={filter.id}
                placeholder={filter.placeholder}
                options={filter.options}
                label={filter.label}
                multiple={filter.multiple}
              />
            )}
          </Box>
        ))}
        <Box position={"relative"}>
          {
            <Typography
              variant="body1"
              component="div"
              sx={{
                position: "absolute",
                top: "-48%",
                left: "2",
                fontSize: "14px",
              }}
            >
              {companyName !== "" &&
                companyName !== undefined &&
                "Company Name"}
            </Typography>
          }
          <OutlinedInput
            size="small"
            placeholder="Search Company Name"
            onChange={handleCompanyNameChange}
            sx={{
              padding: "0",
            }}
          />
        </Box>
      </Box>

      {/* jobs card */}
      <Box sx={{width:"100%", height:"100%", display:'flex',justifyContent:'center', alignItems:'center'}}>

      <Grid container sx={{width:"100%", height:"100%", gap:"24px", justifyContent:'center'}} >
        <Grid>
          <JobCard />
        </Grid>
        <Grid>
          <JobCard />
        </Grid>
        <Grid>
          <JobCard />
        </Grid>
        <Grid>
          <JobCard />
        </Grid>
        <Grid>
          <JobCard />
        </Grid>
        <Grid>
          <JobCard />
        </Grid>
      </Grid>
      </Box>

    </Box>
  );
};

export default SearchJob;
