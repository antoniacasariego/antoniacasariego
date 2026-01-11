import { NavLink, useLocation, useNavigate } from "react-router-dom";

type NavbarProps = {
  onHomeClick?: () => void;
  onWorkClick?: () => void;
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
      if (location.hash) navigate("/", { replace: true });
      // if no prop provided, still scroll
      (onHomeClick ?? (() => window.scrollTo({ top: 0, behavior: "smooth" })))();
    } else {
      navigate("/");
      setTimeout(() => {
        (onHomeClick ?? (() => window.scrollTo({ top: 0, behavior: "smooth" })))();
      }, 0);
    }
  };

  const handleWork = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isHomeRoute) {
      if (location.hash !== "#work") navigate("/#work", { replace: true });
      // if no prop provided, scroll to id directly
      (onWorkClick ??
        (() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })))();
    } else {
      navigate("/#work");
      setTimeout(() => {
        (onWorkClick ??
          (() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })))();
      }, 0);
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
        className={isWorkHashActive || isWorkDetail ? "nav-link nav-link--active" : "nav-link"}
      >
        Work
      </a>

      <span className="nav-link nav-link--disabled">
        About me
      </span>
    </nav>
  );
}
