import React, { useEffect, useState } from "react";
import { getCategories, getQueryCategories } from "../utils/api";
import {Link} from "react-router-dom"
import NavDropdown from "./NavDropdown";

export default function Nav({setReviews, categories, setCategories}) {

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  

  return (
    <nav className="Nav">
    <Link to='/' style={{ textDecoration: 'none' }}>
      <h2 className="NavTitle">GameShack</h2>
      </Link>
    </nav>
  );
}
