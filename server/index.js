const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  logo: String,
  location: String,
  jobType: String,
  salaryMin: Number,
  salaryMax: Number,
  description: String,
  createdAt: Date,
});

const Job = mongoose.model("Job", jobSchema);

app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post("/api/jobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const seedJobs = async () => {
  const count = await Job.countDocuments();
  console.log(count);

  if (count === 0) {
    const sampleJobs = [
      {
        title: "Software Engineer",
        company: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        location: "Mountain View, CA",
        jobType: "Internship",
        salaryMin: 1200000,
        salaryMax: 1600000,
        description:
          "Develop scalable backend systems and improve search algorithms.",
        createdAt: "2025-05-02T08:15:00.000Z",
      },
      {
        title: "Frontend Developer",
        company: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        location: "Redmond, WA",
        jobType: "Part-time",
        salaryMin: 1100000,
        salaryMax: 1500000,
        description:
          "Build modern web applications using React and TailwindCSS.",
        createdAt: "2025-05-02T10:30:00.000Z",
      },
      {
        title: "Data Scientist",
        company: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        location: "Seattle, WA",
        jobType: "Contract",
        salaryMin: 1300000,
        salaryMax: 1700000,
        description:
          "Work on predictive analytics and AI-powered recommendation systems.",
        createdAt: "2025-05-02T13:45:00.000Z",
      },
      {
        title: "UX Designer",
        company: "Apple",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        location: "Cupertino, CA",
        jobType: "Full-time",
        salaryMin: 1150000,
        salaryMax: 1400000,
        description:
          "Design intuitive user experiences for next-generation Apple products.",
        createdAt: "2025-05-02T15:20:00.000Z",
      },
      {
        title: "Machine Learning Engineer",
        company: "Meta",
        logo: "https://logos-world.net/meta-logo/",
        location: "Menlo Park, CA",
        jobType: "Internship",
        salaryMin: 1250000,
        salaryMax: 1650000,
        description:
          "Optimize ML models for large-scale social media content analysis.",
        createdAt: "2025-05-02T17:55:00.000Z",
      },
      {
        title: "Cybersecurity Analyst",
        company: "IBM",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        location: "New York, NY",
        jobType: "Full-time",
        salaryMin: 1050000,
        salaryMax: 1400000,
        description:
          "Enhance security protocols and protect critical business data.",
        createdAt: "2025-05-02T19:10:00.000Z",
      },
      {
        title: "Cloud Architect",
        company: "Oracle",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
        location: "Austin, TX",
        jobType: "Part-time",
        salaryMin: 1250000,
        salaryMax: 1600000,
        description:
          "Design cloud infrastructure for enterprise-scale applications.",
        createdAt: "2025-05-02T21:30:00.000Z",
      },
      {
        title: "Blockchain Developer",
        company: "Tesla",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
        location: "Palo Alto, CA",
        jobType: "Contract",
        salaryMin: 1150000,
        salaryMax: 1500000,
        description:
          "Develop secure blockchain solutions for Tesla's supply chain tracking.",
        createdAt: "2025-05-02T23:00:00.000Z",
      },
      {
        title: "Embedded Systems Engineer",
        company: "Samsung",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
        location: "Seoul, South Korea",
        jobType: "Full-time",
        salaryMin: 1100000,
        salaryMax: 1400000,
        description:
          "Develop embedded software for next-gen consumer electronics.",
        createdAt: "2025-05-03T02:15:00.000Z",
      },
      {
        title: "Game Developer",
        company: "Sony",
        logo: "https://logos-world.net/sony-logo/",
        location: "Tokyo, Japan",
        jobType: "Internship",
        salaryMin: 1200000,
        salaryMax: 1550000,
        description: "Design immersive gaming experiences for PlayStation.",
        createdAt: "2025-05-03T05:40:00.000Z",
      },
    ];

    await Job.insertMany(sampleJobs);
    console.log("Seeded 10 sample jobs");
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    seedJobs();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}
