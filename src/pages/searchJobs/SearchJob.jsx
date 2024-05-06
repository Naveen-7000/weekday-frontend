// import { addJobs } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { Box, OutlinedInput } from "@mui/material";
import JobTitle from "../../components/JobTitle";
import AutoComplete from "../../components/autocomplete/AutoComplete";
import "./SearchJob.css";
import { addJobs, addTotalPages, updateFilterOptions } from "../../redux/actions";
import { useCallback, useEffect, useMemo } from "react";
import { filters } from "../../utils/filtersData";

const SearchJob = () => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector((state) => state.filters.filters);
  const {jobs,totalPages} = useSelector((state) => state.jobs);


  useEffect(()=>{
    getJobs();
 },[])

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
        dispatch(addTotalPages(result?.totalCount))
      })
      .catch((err) => console.error(err));
  }, []);



  const handleCompanyNameChange = (e) => {
    let companyName = e.target.value;
    dispatch(
      updateFilterOptions({ filterType: "companyName", options: companyName })
    );
  };

  const filteredJobs = useMemo(() => {
    // Apply filters here
    return jobs.filter((job) => {
        // Example: Filtering based on experience
        if (appliedFilters.experience.length > 0 && !appliedFilters.experience.some(exp => exp.value === job?.minExp?.toString())) {
            return false;
        }
        // Apply other filters similarly
        return true;
    });
}, [jobs, appliedFilters]);


  console.log("filtered jobs",filteredJobs);
  console.log("applied filters",appliedFilters);

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
            <AutoComplete
              id={filter.id}
              placeholder={filter.placeholder}
              options={filter.options}
              label={filter.label}
              filters={filters}
              multiple={filter.multiple}
            />
          </Box>
        ))}
        {/* {Object.entries(appliedFilters).map(([filterType, options], index) => (
          <Box key={index} sx={{ position: "relative", padding: "8px 4px" }}>
            <AutoComplete
              placeholder={filterType}
              options={options}
              label={filterType}
            />
          </Box>
        ))} */}
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
  );
};

export default SearchJob;
