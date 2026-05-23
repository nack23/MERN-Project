import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import Sidebar
from "../components/Sidebar";

import StatsCard
from "../components/StatsCard";

import ProjectCard
from "../components/ProjectCard";

import "../styles/Dashboard.css";

function Dashboard() {

  const navigate =
  useNavigate();

  // USER

  const [
    user,
    setUser
  ] = useState(null);

  // ANALYTICS

  const [
    analytics,
    setAnalytics
  ] = useState({

    totalTasks:0,

    completedTasks:0,

    pendingTasks:0
  });

  // PROJECTS

  const [
    projects,
    setProjects
  ] = useState([]);

  // TASKS

  const [
    tasks,
    setTasks
  ] = useState([]);

  // LOAD DATA

  useEffect(()=>{

    fetchDashboard();

    fetchAnalytics();

    fetchProjects();

    fetchTasks();

  },[]);

  // FETCH USER

  const fetchDashboard =
  async()=>{

    try{

      const response =
      await fetch(

        "http://localhost:5000/dashboard",

        {
          method:"GET",

          credentials:"include"
        }
      );

      const data =
      await response.json();

      setUser(data.user);

    }catch(error){

      console.log(error);
    }
  };

  // FETCH ANALYTICS

  const fetchAnalytics =
  async()=>{

    try{

      const response =
      await axios.get(

        "http://localhost:5000/get-analytics",

        {
          withCredentials:true
        }
      );

      setAnalytics(
        response.data
      );

    }catch(error){

      console.log(error);
    }
  };

  // FETCH PROJECTS

  const fetchProjects =
  async()=>{

    try{

      const response =
      await axios.get(

        "http://localhost:5000/projects",

        {
          withCredentials:true
        }
      );

      setProjects(
        response.data
      );

    }catch(error){

      console.log(error);
    }
  };

  // FETCH TASKS

  const fetchTasks =
  async()=>{

    try{

      const response =
      await axios.get(

        "http://localhost:5000/task-projects",

        {
          withCredentials:true
        }
      );

      const sortedTasks =
      response.data.sort(

        (a,b)=>

          new Date(b.updatedAt) -
          new Date(a.updatedAt)
      );

      setTasks(
        sortedTasks
      );

    }catch(error){

      console.log(error);
    }
  };

  // LOGOUT

  const handleLogout =
  async()=>{

    try{

      await fetch(

        "http://localhost:5000/logout",

        {
          method:"GET",

          credentials:"include"
        }
      );

      navigate("/");

    }catch(error){

      console.log(error);
    }
  };

  return(

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

        {/* NAVBAR */}

        <div className="navbar">

          <div>

            <h1>

              Dashboard

            </h1>

            {
              user && (

                <p className="welcome-text">

                  Welcome,

                  <span className="username">

                    {user.name}

                  </span>

                </p>
              )
            }

          </div>

          <button
          className="logout-btn"
          onClick={handleLogout}
          >

            Logout

          </button>

        </div>

        {/* STATS */}

        <div className="dashboard-cards">

          <StatsCard
            title="Total Tasks"
            value={
              analytics.totalTasks
            }
            icon="fa-solid fa-list-check"
          />

          <StatsCard
            title="Completed"
            value={
              analytics.completedTasks
            }
            icon="fa-solid fa-circle-check"
          />

          <StatsCard
            title="Pending"
            value={
              analytics.pendingTasks
            }
            icon="fa-solid fa-clock"
          />

        </div>

        {/* PROJECTS */}

        <h2 className="section-title">

          My Projects

        </h2>

        <div className="dashboard-grid">

          {
            projects.length === 0 ? (

              <div className="empty-card">

                No Projects Found

              </div>

            ) : (

              projects
              .slice(0,4)
              .map((project)=>(

                <ProjectCard

                  key={project._id}

                  name={
                    project.projectName
                  }

                  members={
                    project.members.length
                  }

                />
              ))
            )
          }

        </div>

        {/* TASKS */}

        <h2 className="section-title">

          Your Recent Tasks

        </h2>

        <div className="dashboard-grid">

          {
            tasks.length === 0 ? (

              <div className="empty-card">

                No Tasks Found

              </div>

            ) : (

              tasks
              .slice(0,4)
              .map((task)=>(

                <div
                className="dashboard-task-card"
                key={task._id}
                >

                  <div className="dashboard-task-top">

                    <div>

                      <h3>

                        {
                          task.projectName
                        }

                      </h3>

                      <div className="dashboard-task-admin">

                        Admin :

                        <span>

                          {
                            task.admin?.name
                            || "Unknown"
                          }

                        </span>

                      </div>

                    </div>

                    <div
                    className={`dashboard-task-status ${
                      task.status === "Done"
                      ? "done"
                      : task.status === "In Progress"
                      ? "progress"
                      : "todo"
                    }`}
                    >

                      {
                        task.currentStatus
            
                      }

                    </div>

                  </div>

                </div>
              ))
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;