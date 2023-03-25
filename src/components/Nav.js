import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/About">about</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
