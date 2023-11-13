import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="nav-container">
      <div className="navbar">
        <Link className="lnk" to="/">
          Home
        </Link>
        <Link className="lnk" to="/create-recipe">
          Create Recipe
        </Link>
        <Link className="lnk" to="/saved-recipes">
          Saved Recipes
        </Link>
        {!cookies.access_token ? (
          <Link className="lnk" to="/auth">
            Login/Register
          </Link>
        ) : (
          <a className="lnk" onClick={logout}>
            {" "}
            Logout{" "}
          </a>
        )}
      </div>
    </div>
  );
};
