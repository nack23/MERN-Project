import {
  useEffect,
  useState,
  useCallback
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

  const [
    user,
    setUser
  ] = useState(null);

  const [
    analytics,
    setAnalytics
  ] = useState({

    totalTasks:0,

    completedTasks:0,

    pendingTasks:0
  });

  const [
    projects,
    setProjects
  ] = useState([]);

  const [
    tasks,
    setTasks
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState("");

  const fetchDashboard =
  useCallback(

    async()=>{

      try{

        const response =
        await fetch(

          `${process.env.REACT_APP_API_URL}/dashboard`,

          {
            method:"GET",

            credentials:"include"
          }
        );

        // UNAUTHORIZED

        if(response.status === 401){

          localStorage.removeItem(
            "userEmail"
          );

          navigate("/login");

          return;
        }

        const data =
        await response.json();

        setUser(data.user);

      }catch(error){

        console.log(error);

        setError(
          "Unable to fetch user"
        );
      }
    },

    [navigate]
  );

  const fetchAnalytics =
  useCallback(

    async()=>{

      try{

        const response =
        await axios.get(

          `${process.env.REACT_APP_API_URL}/get-analytics`,

          {
            withCredentials:true
          }
        );

        setAnalytics(
          response.data
        );

      }catch(error){

        console.log(error);

        // UNAUTHORIZED

        if(
          error.response?.status === 401
        ){

          navigate("/login");
        }
      }
    },

    [navigate]
  );

  const fetchProjects =
  useCallback(

    async()=>{

      try{

        const response =
        await axios.get(

          `${process.env.REACT_APP_API_URL}/projects`,

          {
            withCredentials:true
          }
        );

        setProjects(
          response.data
        );

      }catch(error){

        console.log(error);

        // UNAUTHORIZED

        if(
          error.response?.status === 401
        ){

          navigate("/login");
        }
      }
    },

    [navigate]
  );

  const fetchTasks =
  useCallback(

    async()=>{

      try{

        const response =
        await axios.get(

          `${process.env.REACT_APP_API_URL}/task-projects`,

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

        // UNAUTHORIZED

        if(
          error.response?.status === 401
        ){

          navigate("/login");
        }
      }
    },

    [navigate]
  );

  const loadDashboard =
  useCallback(

    async()=>{

      try{

        await Promise.all([

          fetchDashboard(),

          fetchAnalytics(),

          fetchProjects(),

          fetchTasks()
        ]);

      }catch(error){

        console.log(error);

        setError(
          "Failed to load dashboard"
        );

      }finally{

        setLoading(false);
      }
    },

    [

      fetchDashboard,

      fetchAnalytics,

      fetchProjects,

      fetchTasks
    ]
  );

  useEffect(()=>{

    loadDashboard();

  },[loadDashboard]);

  const handleLogout =
  async()=>{

    try{

      await fetch(

        `${process.env.REACT_APP_API_URL}/logout`,

        {
          method:"GET",

          credentials:"include"
        }
      );

      localStorage.removeItem(
        "userEmail"
      );

      navigate("/login");

    }catch(error){

      console.log(error);
    }
  };

  return(

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-main">

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

        {
          error && (

            <div className="error-message">

              {error}

            </div>
          )
        }

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

        <h2 className="section-title">

          My Projects

        </h2>

        <div className="dashboard-grid">

          {
            loading ? (

              <div className="small-loader">

                Loading Projects...

              </div>

            ) : projects.length === 0 ? (

              <div className="empty-card">

                <div>

                  <i className="fa-solid fa-folder-open"></i>

                  <h3>

                    No Projects Found

                  </h3>

                </div>

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

        <h2 className="section-title">

          Your Recent Tasks

        </h2>

        <div className="dashboard-grid">

          {
            loading ? (

              <div className="small-loader">

                Loading Tasks...

              </div>

            ) : tasks.length === 0 ? (

              <div className="empty-card">

                <div>

                  <i className="fa-solid fa-list-check"></i>

                  <h3>

                    No Tasks Found

                  </h3>

                </div>

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
                      task.currentStatus === "Done"
                      ? "done"
                      : task.currentStatus === "In Progress"
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