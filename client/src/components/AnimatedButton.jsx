import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const AnimatedButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      className={
        styles.ctaLink +
        " relative overflow-hidden pl-8 py-3 bg-blue-600 text-white rounded-md transition-all duration-300 w-32"
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      to="/login"
    >
      <div className="relative h-6 flex items-center justify-center">
        <span
          className={`absolute inset-0 transition-all duration-300 ${
            hovered
              ? "translate-y-[-100%] opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          Create Job
        </span>
        <span
          className={`absolute inset-0 transition-all duration-300 pl-4 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          Login
        </span>
      </div>
    </Link>
  );
};

export default AnimatedButton;
