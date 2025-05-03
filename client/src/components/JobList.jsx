import JobFilters from "./JobFilters";
import JobCard from "./JobCard";
import { useContext } from "react";
import { JobsContext } from "./AppLayout";

const JobList = () => {
  const { jobs, setJobs, allJobs } = useContext(JobsContext);

  return (
    <>
      <JobFilters jobs={jobs} allJobs={allJobs} setJobs={setJobs} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6 p-6 mt-10">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </>
  );
};

export default JobList;
