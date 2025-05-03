import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JobList from "./components/JobList";
import AppLayout from "./components/AppLayout";
import loader from "./components/loader";
import Error from "./components/Error";
import { Spinner } from "@material-tailwind/react";
import FindTalents from "./components/FindTalents";
import Testimonials from "./components/Testimonial";
import AboutUs from "./components/About";
import Login from "./Pages/Login";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    hydrateFallbackElement: <Spinner />,
    errorElement: <Error />,
    loader,
    children: [
      { path: "/", element: <JobList />, loader, errorElement: <Error /> },
      {
        path: "/find-jobs",
        element: <JobList />,
        loader,
        errorElement: <Error />,
      },
      {
        path: "/find-talents",
        element: <FindTalents />,
        errorElement: <Error />,
      },
      { path: "/about", element: <AboutUs />, errorElement: <Error /> },
      {
        path: "/testimonials",
        element: <Testimonials />,
        errorElement: <Error />,
      },
    ],
  },
  { path: "/login", element: <Login />, errorElement: <Error /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
