import {
  Link,
  useLocation
} from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  BarChart3
} from "lucide-react";

function Sidebar(){

  const location =
  useLocation();

  return(

    <div className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-circle">

          E

        </div>

        <h2>

          Ethara AI

        </h2>

      </div>

      {/* LINKS */}

      <div className="sidebar-links">

        <Link
          to="/dashboard"

          className={
            location.pathname === "/dashboard"
            ? "active-link"
            : ""
          }
        >

          <LayoutDashboard size={22} />

          <span>

            Dashboard

          </span>

        </Link>

        <Link
          to="/projects"

          className={
            location.pathname === "/projects"
            ? "active-link"
            : ""
          }
        >

          <FolderKanban size={22} />

          <span>

            Projects

          </span>

        </Link>

        <Link
          to="/tasks"

          className={
            location.pathname === "/tasks"
            ? "active-link"
            : ""
          }
        >

          <ListTodo size={22} />

          <span>

            Tasks

          </span>

        </Link>

        <Link
          to="/analytics"

          className={
            location.pathname === "/analytics"
            ? "active-link"
            : ""
          }
        >

          <BarChart3 size={22} />

          <span>

            Analytics

          </span>

        </Link>

      </div>

    </div>
  );
}

export default Sidebar;