import { Outlet, useLoaderData, useNavigation } from "react-router";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import CreateJob from "./CreateJob";
import { createContext } from "react";
import { useAuthProvider } from "../Pages/FakeAuthContextProvider";
import { useRevalidator } from "react-router-dom";

const revalidator = useRevalidator();

export const JobsContext = createContext();

function AppLayout() {
  const { isAuthenticated } = useAuthProvider();

  const allJobs = useLoaderData();
  function handleRefresh() {
    revalidator.revalidate();
  }

  const [jobs, setJobs] = useState(allJobs);

  useEffect(() => {
    if (allJobs.length > 0) {
      setJobs(allJobs);
    }
  }, [allJobs]);

  const [isCreateJob, setIsCreateJob] = useState(false);
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      <div className="flex items-center justify-center">
        <Navbar
          IscreateJob={isCreateJob}
          setIsCreateJob={setIsCreateJob}
          isAuthenticated={isAuthenticated}
        />
      </div>
      <div className="overflow-scroll">
        <main className="mx-auto max-w-[80%]">
          {isCreateJob && (
            <div
              className="z-10 absolute inset-0 flex items-center justify-center bg-slate-800/20 "
              onClick={() => setIsCreateJob(false)}
            >
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <CreateJob
                  IscreateJob={isCreateJob}
                  setIsCreateJob={setIsCreateJob}
                  jobs={jobs}
                  setJobs={setJobs}
                  handleRefresh={handleRefresh}
                />
              </div>
            </div>
          )}
          {isNavigating && <Spinner />}

          <JobsContext.Provider value={{ jobs, setJobs, allJobs }}>
            <Outlet />
          </JobsContext.Provider>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
