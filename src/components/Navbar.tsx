import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isWorkActive =
    location.pathname.startsWith("/work");

  return (
    <nav className="nav">
      {/* HOME */}
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive && !isWorkActive
            ? "nav-link nav-link--active"
            : "nav-link"
        }
      >
        Home
      </NavLink>

      {/* WORK (logical, not literal route yet) */}
    <NavLink
        to="/#work"
        className="nav-link"
    >
        Work
    </NavLink>

      {/* ABOUT (placeholder for now) */}
      <span className="nav-link nav-link--disabled">
        About me
      </span>
    </nav>
  );
}
