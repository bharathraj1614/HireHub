const getTimeAgo = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const differenceMs = now - createdDate; // Difference in milliseconds

  const minutesAgo = Math.floor(differenceMs / (1000 * 60));
  const hoursAgo = Math.floor(differenceMs / (1000 * 60 * 60));
  const daysAgo = Math.floor(hoursAgo / 24);

  if (minutesAgo < 60) return "Just now";
  return daysAgo > 0 ? `${daysAgo} days ago` : `${hoursAgo}h ago`;
};

const JobCard = ({ job }) => (
  <div className="p-6 shadow-lg rounded-lg bg-white border border-gray-200 relative">
    <div className="flex justify-between items-center mb-3">
      <img
        src={
          job.logo ||
          "https://raw.githubusercontent.com/bharathraj1614/Image-hosting/refs/heads/main/companylogo.png"
        }
        alt="Company Logo"
        className="h-20 w-20 object-contain"
      />
      <span className="text-xs text-gray-500 bg-[#B0D9FF] rounded-[10px] px-[10px] py-[7px]">
        {getTimeAgo(job.createdAt)}
      </span>
    </div>

    <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
    <p className="text-sm text-gray-500">{job.company}</p>

    <div className="flex items-center text-sm text-gray-600 mt-2">
      <img
        src="https://raw.githubusercontent.com/bharathraj1614/Image-hosting/refs/heads/main/expertise.png"
        className="h-4 w-4 mr-2"
        alt="Experience"
      />
      <span>{job.experience || "1 - 3"} Exp</span>

      <img
        src="https://raw.githubusercontent.com/bharathraj1614/Image-hosting/refs/heads/main/building.png"
        className="h-4 w-4 mx-2"
        alt="Job Type"
      />
      <span>{job.jobType}</span>

      <img
        src="https://raw.githubusercontent.com/bharathraj1614/Image-hosting/refs/heads/main/layers.png"
        className="h-4 w-4 mx-2"
        alt="Salary"
      />
      <span>{job.salaryMin / 100000 + " - " + job.salaryMax / 100000} LPA</span>
    </div>

    <p className="mt-3 text-sm text-gray-500">{job.description}</p>

    <button className="mt-4 w-full bg-[#00AAFF] hover:bg-[#038cd1] text-white py-2 rounded-lg  transition-all duration-300">
      Apply Now
    </button>
  </div>
);

export default JobCard;
