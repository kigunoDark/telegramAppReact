import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="top-menu">
      <NavLink
        to="/work"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Работа
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Дом
      </NavLink>
      <NavLink
        to="/career"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Карьера
      </NavLink>
    </div>
  );
};

export default Menu;
