// src/components/Navbar.tsx
import { NavLink, useLocation, useNavigate } from "react-router-dom";

type NavbarProps = {
  onHomeClick: () => void;
  onWorkClick: () => void;
};

export default function Navbar({ onHomeClick, onWorkClick }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeRoute = location.pathname === "/";
  const isWorkHashActive = isHomeRoute && location.hash === "#work";
  const isWorkDetail = location.pathname.startsWith("/work/");
  const isHomeActive = isHomeRoute && !isWorkHashActive;

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isHomeRoute) {
      // clear hash so home becomes "active" again
      if (location.hash) navigate("/", { replace: true });
      onHomeClick();
    } else {
      navigate("/");
      // allow route to render then scroll
      setTimeout(() => onHomeClick(), 0);
    }
  };

  const handleWork = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isHomeRoute) {
      if (location.hash !== "#work") navigate("/#work", { replace: true });
      onWorkClick();
    } else {
      navigate("/#work");
      setTimeout(() => onWorkClick(), 0);
    }
  };

  return (
    <nav className="nav">
      <a
        href="/"
        onClick={handleHome}
        className={isHomeActive ? "nav-link nav-link--active" : "nav-link"}
      >
        Home
      </a>

      <a
        href="/#work"
        onClick={handleWork}
        className={
          isWorkHashActive || isWorkDetail ? "nav-link nav-link--active" : "nav-link"
        }
      >
        Work
      </a>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "nav-link nav-link--active" : "nav-link"
        }
      >
        About me
      </NavLink>
    </nav>
  );
}
