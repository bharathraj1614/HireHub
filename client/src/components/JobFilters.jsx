import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { useEffect, useState } from "react";

const JobFilters = ({ allJobs, setJobs, jobs }) => {
  const [salaryRange, setSalaryRange] = useState([0, 500]);

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Prefered location");
  const [jobType, setJobType] = useState("Job Type");
  const uniqueJobTypes = [...new Set(allJobs?.map((job) => job.jobType) || [])];
  const uniqueLocations = [
    ...new Set(allJobs?.map((job) => job.location) || []),
  ];

  useEffect(() => {
    if (!allJobs || allJobs.length === 0) return;

    let filteredJobs = [...allJobs, ...jobs];

    filteredJobs = [
      ...new Map(filteredJobs.map((job) => [job.id, job])).values(),
    ];

    if (query) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (location !== "Prefered location") {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.location.toLowerCase().trim() === location.toLowerCase().trim()
      );
    }

    if (jobType !== "Job Type") {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.jobType.toLowerCase().trim() === jobType.toLowerCase().trim()
      );
    }

    filteredJobs = filteredJobs.filter(
      (job) =>
        Number(job.salaryMax / 12) >= salaryRange[0] * 1000 &&
        Number(job.salaryMin / 12) <= salaryRange[1] * 1000
    );

    setJobs(filteredJobs);
  }, [query, location, jobType, salaryRange, allJobs]);
  return (
    <div className="p-6 bg-white items-center rounded-lg flex gap-7 w-full shadow-[0px_4px_8px_rgba(0,0,0,0.1)] border-0 divide-x divide-slate-400">
      <div className="flex flex-col sm:w-1/4 border-0 px-5">
        <input
          type="text"
          placeholder="&#128269; &nbsp; &nbsp; Search By Job Title, Role"
          className="p-[11px] border-0 rounded-md focus:ring-0 grayscale text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="relative sm:w-1/4 px-5">
        <select
          className="p-2 rounded-md border-0 text-sm focus:ring-0 grayscale"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="Prefered location">
            📍 &nbsp; &nbsp; Prefered location
          </option>
          {uniqueLocations.map((location, i) => (
            <option key={i}>{location}</option>
          ))}
        </select>
        <span className="absolute right-3 top-[55%] transform -translate-y-1/2 pointer-events-none">
          ⏷
        </span>
      </div>

      <div className="relative sm:w-1/4 border-l border-gray-300 px-5">
        <select
          className="p-2 border-0 rounded-md focus:ring-0 grayscale text-sm"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="Job Type">👤 &nbsp; &nbsp; Job Type</option>
          {uniqueJobTypes.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </select>
        <span className="absolute right-3 top-[55%] transform -translate-y-1/2 pointer-events-none">
          ⏷
        </span>
      </div>

      <div className="pl-10 sm:w-1/4 border-l border-gray-300">
        <p className="mb-4 text-sm">
          Salary per month {salaryRange[0] + "k - " + salaryRange[1]}k
        </p>
        <Slider
          range
          min={0}
          max={500}
          step={10}
          value={salaryRange}
          onChange={setSalaryRange}
          trackStyle={[{ backgroundColor: "black" }]}
          handleStyle={[
            {
              backgroundColor: "black",
              borderColor: "black",
              width: 20,
              height: 20,
              borderRadius: "50%",
              marginTop: -8,
            },
            {
              backgroundColor: "black",
              borderColor: "black",
              width: 20,
              height: 20,
              borderRadius: "50%",
              marginTop: -8,
            },
          ]}
          railStyle={{ backgroundColor: "#ddd" }}
        />
      </div>
    </div>
  );
};

export default JobFilters;
