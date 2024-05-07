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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { filters } from "../../utils/filtersData";
import JobCard from "../../components/cards/JobCard";

const SearchJob = () => {
  const [companyName, setCompanyName] = useState("");
  const loaderRef = useRef(null);
  const [offset,setOffset] = useState(0);
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.filters.filters);
  const { jobs, totalPages } = useSelector((state) => state.jobs);

  // Memoize whether any role option is selected from roles filter
  //  if yes then render tech stack else don't show tech stack
  const isRoleSelected = useMemo(
    () => appliedFilters.roles.length > 0,
    [appliedFilters.roles]
  );

  //  api call using useCallback to prevent from unnecessary re rednering or 
  // we can use react-query for better performance
  const getJobs = useCallback(async (pageNumber) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: pageNumber,
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


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if(totalPages >= offset){
          let page = offset+1;
          getJobs(page);
          setOffset(prev=>prev+1);
        }
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);


  const handleCompanyNameChange = (e) => {
    let name = e.target.value;
    setCompanyName(name);
    dispatch(updateFilterOptions({ filterType: "companyName", options: [name] }));
  };

  //  filter jobs based on filter options
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Example: Filtering based on role
      if (
        appliedFilters.roles?.length > 0 &&
        !appliedFilters.roles.some((exp) => exp.value === job.jobRole)
      ) {
        return false;
      }

      // Example: Filtering based on experience minimum show
      if (
        appliedFilters.experience?.value !== undefined &&
        job.minExp !== null &&
        job.minExp !== parseInt(appliedFilters.experience.value)
      ) {
        return false;
      }

      // Filtering based on min base pay
      if (
        appliedFilters.minBasePay?.value !== undefined &&
        parseInt(appliedFilters.minBasePay.value) > job.minJdSalary
      ) {
        return false;
      }

      // Filtering based on remote work preference
      if (
        appliedFilters.remote?.length > 0 &&
        !appliedFilters.remote?.some((exp) => exp.value === job.location)
      ) {
        return false;
      }

      // Filtering based on tech stacks
      if (
        appliedFilters.techStacks?.length > 0 &&
        !appliedFilters.techStacks?.some((stack) =>
          job.techStacks.includes(stack.value)
        )
      ) {
        return false;
      }

      // Filtering based on company name
      if (
        appliedFilters?.companyName?.length > 0  &&
        !job.companyName
          .toLowerCase()
          .includes(appliedFilters?.companyName[0]?.toLowerCase())
      ) {
        console.log(typeof(appliedFilters?.companyName[0].toLowerCase()));
        return false;
      }

      // Apply other filters similarly
      return true;
    });
  }, [jobs, appliedFilters]);

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
      {/* title with badge */}
      <JobTitle jobsCount={jobs?.length} />
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {
           filteredJobs?.length > 0 ? 
        <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            gap: "24px",
            justifyContent: "center",
          }}
          >
          {filteredJobs.map((job,index) => (
            <Grid key={index}>
              <JobCard
                companyName={job.companyName}
                location={job.location}
                logoUrl={job.logoUrl}
                jobDetailsFromCompany={job.jobDetailsFromCompany}
                minExp={job.minExp}
                maxExp={job.maxExp}
                minJdSalary={job.minJdSalary}
                maxJdSalary={job.maxJdSalary}
                jobRole={job.jobRole}
                salaryCurrencyCode={job.salaryCurrencyCode}
                jdLink={job.jdLink}
              />
            </Grid>
          ))}
        </Grid> 
        : <Box sx={{
          padding:10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap:2,
          textAlign: 'center',
        }}>
          {
            jobs.length > 0 && <>   
            <img src={'https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png'} style={{
              width:150
            }} />
            <p>No Jobs available for this category at the moment</p>
            </>
          }
        </Box>
        }
      </Box>
      {/* just to track scroll reaches end */}
      <Box ref={loaderRef}>{"_"}</Box>
    </Box>
  );
};

export default SearchJob;
