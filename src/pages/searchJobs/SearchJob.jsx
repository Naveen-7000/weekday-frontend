// import { useDispatch, useSelector } from 'react-redux'
// import { addJobs } from '../../redux/actions';
import JobTitle from "../../components/JobTitle";
import "./SearchJob.css";

const SearchJob = () => {
    // const dispatch = useDispatch();
    // const jobs = useSelector((state)=>state.jobs);

  return (
    <div className="jobs-container">
      <JobTitle />
    </div>
  )
}

export default SearchJob