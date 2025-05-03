import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logo from "./Logo";
import AnimatedButton from "./AnimatedButton";

const Navbar = ({ IscreateJob, setIsCreateJob, isAuthenticated }) => (
  <nav className={styles.nav + " w-fit bg-white px-10 rounded-full my-5"}>
    <NavLink to="/">
      <Logo />
    </NavLink>
    <ul>
      <li>
        <NavLink to="/">home</NavLink>
      </li>
      <li>
        <NavLink to="/find-jobs">find jobs</NavLink>
      </li>
      <li>
        <NavLink to="/find-talents">find talents</NavLink>
      </li>
      <li>
        <NavLink to="/about">about us</NavLink>
      </li>
      <li>
        <NavLink to="/testimonials">testmonials</NavLink>
      </li>
      <li>
        {!isAuthenticated ? (
          <AnimatedButton />
        ) : (
          <NavLink
            onClick={() => setIsCreateJob(!IscreateJob)}
            className={styles.ctaLink}
          >
            Create Jobs
          </NavLink>
        )}
      </li>
    </ul>
  </nav>
);

export default Navbar;
