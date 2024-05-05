import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addJobs } from '../../redux/actions';

const SearchJob = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state)=>state.jobs);

    const createNewJob = () =>{
        const newJobs = {
            name:'Credanic',
            published:"Today",
            Description:"Hello credanic is hiring frontend developer"
        }
        dispatch(addJobs(newJobs))
    }

  return (
    <div>
        {
            jobs.length > 0 && jobs.map((job,index)=>(
                <p key={index}>{job?.name ? job?.name : '-'}</p>
            ))
        }
        <div>
            <button onClick={createNewJob}>Add Jobs</button>
        </div>
    </div>
  )
}

export default SearchJob