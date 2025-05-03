import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),

  company: yup
    .string()
    .required("Company is required")
    .trim()
    .min(3, "Company name must be at least 3 characters long")
    .max(100, "Company name cannot exceed 100 characters"),

  location: yup
    .string()
    .required("Location is required")
    .notOneOf([""], "Please select a location"),

  jobType: yup.string().required("Job type is required"),

  salaryMin: yup
    .number()
    .required("Minimum salary is required")
    .min(10000, "Minimum salary must be at least ₹10,000")
    .max(9999999, "Minimum salary must not exceed ₹500,000"),

  salaryMax: yup
    .number()
    .required("Maximum salary is required")
    .min(
      yup.ref("salaryMin"),
      "Maximum salary must be greater than Minimum salary"
    )
    .max(10000000, "Maximum salary must not exceed ₹1,000,000"),

  applicationDeadline: yup
    .date()
    .required("Application deadline required")
    .min(new Date(), "Deadline cannot be in the past"),

  description: yup
    .string()
    .required("Description required")
    .min(50, "Description must be at least 50 characters long"),
});

const CreateJob = ({ setJobs, setIsCreateJob }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formValues = watch();

  const onSubmit = async (data) => {
    try {
      const jobData = {
        ...data,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post("/api/jobs", jobData);

      setJobs((jobs) => [...jobs, response.data]);

      toast.success("Job posted successfully!");
      setIsCreateJob(false);
      return redirect("/");
    } catch (err) {
      toast.error("Failed to post job." + err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-600">
            Job Title
          </label>
          <input
            {...register("title")}
            placeholder="Full Stack Developer"
            className={` ${
              formValues.title ? "border-stone-900" : ""
            } w-full border p-2`}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-600">
            Company Name
          </label>
          <input
            {...register("company")}
            placeholder="Amazon, Microsoft, Swiggy"
            className={` ${
              formValues.company ? "border-stone-900" : ""
            } w-full border p-2`}
          />
          {errors.company && (
            <p className="text-red-500">{errors.company.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-600">
            Location
          </label>
          <input
            {...register("location")}
            placeholder="Location"
            className={` ${
              formValues.location ? "border-stone-900" : ""
            } w-full border p-2`}
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <label className="block text-sm font-medium text-stone-600">
            Job Type
          </label>
          <select
            {...register("jobType")}
            className={` ${formValues.jobType ? "border-stone-900" : ""} `}
          >
            <option value="Full-time">Full-Time</option>
            <option value="Part-time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <span className="absolute right-3 top-[60%] transform -translate-y-1/2 pointer-events-none">
            ⏷
          </span>
          {errors.jobType && (
            <p className="text-red-500">{errors.jobType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-600">
            Salary Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              {...register("salaryMin")}
              placeholder="₹0"
              className={` ${
                formValues.salaryMin ? "border-stone-900" : ""
              } w-1/2 border p-2`}
            />
            <input
              type="number"
              {...register("salaryMax")}
              placeholder="₹12,00,000"
              className={` ${
                formValues.salaryMax ? "border-stone-900" : ""
              } w-1/2 border p-2`}
            />
          </div>
          {(errors.salaryMax?.message || errors.salaryMin?.message) && (
            <p className="text-red-500">
              {errors.salaryMax?.message || errors.salaryMin?.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-600">
            Application Deadline
          </label>
          <input
            type="date"
            {...register("applicationDeadline")}
            className={` ${
              formValues.applicationDeadline ? "border-stone-900" : ""
            } w-full border p-2`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-stone-600">
          Job Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Please share a description to let the candidate know more about the job role..."
          className="w-full border p-2 rounded h-[169px]"
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          disabled={isSubmitting}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
        >
          Save Draft
          <span className="inline-block rotate-90 ml-1">»</span>
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00AAFF] text-white px-6 py-2  hover:bg-[#038cd1] rounded-lg transition-colors duration-300 w-[120px]"
        >
          {isSubmitting ? "Publishing..." : "Publish » "}
        </button>
      </div>
    </form>
  );
};

export default CreateJob;
