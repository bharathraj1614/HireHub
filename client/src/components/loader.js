import axios from "axios";
import { toast } from "react-toastify";

export default async function getJobs() {
  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/jobs");
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs.");
      throw new Error();
    }
  };

  return await fetchJobs();
}
