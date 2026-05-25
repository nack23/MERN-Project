import {
  useEffect,
  useState,
  useCallback
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Sidebar
from "../components/Sidebar";

import "../styles/Tasks.css";

function Tasks(){

  const navigate =
  useNavigate();

  const [
    projects,
    setProjects
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState("");

  const [
    showModal,
    setShowModal
  ] = useState(false);

  const [
    selectedProject,
    setSelectedProject
  ] = useState(null);

  const [
    answerText,
    setAnswerText
  ] = useState("");

  const [
    submitting,
    setSubmitting
  ] = useState(false);

  const fetchProjects =
  useCallback(

    async()=>{

      try{

        const response =
        await fetch(

          `${process.env.REACT_APP_API_URL}/task-projects`,

          {
            credentials:"include"
          }
        );

        // UNAUTHORIZED

        if(response.status === 401){

          navigate("/login");

          return;
        }

        const data =
        await response.json();

        setProjects(data);

      }catch(error){

        console.log(error);

        setError(
          "Failed to load tasks"
        );

      }finally{

        setLoading(false);
      }
    },

    [navigate]
  );

  useEffect(()=>{

    fetchProjects();

  },[fetchProjects]);

  const updateStatus =
  async(

    projectId,
    status,
    answer

  )=>{

    try{

      const response =
      await fetch(

        `${process.env.REACT_APP_API_URL}/update-project-status`,

        {

          method:"PUT",

          credentials:"include",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify({

            projectId,
            status,
            answer
          })
        }
      );

      // UNAUTHORIZED

      if(response.status === 401){

        navigate("/login");

        return;
      }

      fetchProjects();

    }catch(error){

      console.log(error);

      setError(
        "Failed to update status"
      );
    }
  };

  const handleStatusChange = (

    project,
    value

  )=>{

    if(value === "Done"){

      setSelectedProject(
        project
      );

      setShowModal(true);

      return;
    }

    updateStatus(

      project._id,

      value,

      ""
    );
  };

  const submitDoneAnswer =
  async()=>{

    if(!answerText.trim()){

      setError(
        "Answer required"
      );

      return;
    }

    try{

      setSubmitting(true);

      const response =
      await fetch(

        `${process.env.REACT_APP_API_URL}/update-project-status`,

        {

          method:"PUT",

          credentials:"include",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify({

            projectId:
            selectedProject._id,

            status:"Done",

            answer:
            answerText
          })
        }
      );

      // UNAUTHORIZED

      if(response.status === 401){

        navigate("/login");

        return;
      }

      setShowModal(false);

      setAnswerText("");

      fetchProjects();

    }catch(error){

      console.log(error);

      setError(
        "Failed to submit answer"
      );

    }finally{

      setSubmitting(false);
    }
  };

  return(

    <div className="tasks-page">

      <Sidebar />

      <div className="tasks-content">

        <h1>

          My Tasks

        </h1>

        {
          error && (

            <div className="error-message">

              {error}

            </div>
          )
        }

        {
          loading ? (

            <div className="small-loader">

              Loading Tasks...

            </div>

          ) : projects.length === 0 ? (

            <div className="no-task">

              <i className="fa-solid fa-list-check"></i>

              <p>

                No Tasks Available

              </p>

            </div>

          ) : (

            <div className="task-grid">

              {
                projects.map((project)=>(

                  <div
                  className="task-card"
                  key={project._id}
                  >

                    <h2>

                      {
                        project.projectName
                      }

                    </h2>

                    <div className="task-description">

                      <h4>

                        Project Description

                      </h4>

                      <p>

                        {
                          project.description
                        }

                      </p>

                    </div>

                    <div className="task-info">

                      <span>

                        👨‍💻 Admin :
                        {
                          project.admin
                          ?.name
                        }

                      </span>

                      <span>

                        ⚡ Priority :
                        {
                          project.priority
                        }

                      </span>

                      <span>

                        📅 Due :
                        {
                          project.dueDate
                          ? new Date(
                              project.dueDate
                            ).toLocaleDateString()
                          : "N/A"
                        }

                      </span>

                    </div>

                    <select

                      value={
                        project.currentStatus
                      }

                      disabled={
                        project.currentStatus
                        === "Done"
                      }

                      onChange={(e)=>

                        handleStatusChange(

                          project,

                          e.target.value
                        )
                      }
                    >

                      <option>

                        To Do

                      </option>

                      <option>

                        In Progress

                      </option>

                      <option>

                        Done

                      </option>

                    </select>

                    {
                      project.currentStatus
                      === "Done"

                      &&

                      project.currentAnswer && (

                        <div className="answer-box">

                          <h4>

                            Submitted Answer

                          </h4>

                          <p>

                            {
                              project.currentAnswer
                            }

                          </p>

                        </div>
                      )
                    }

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

      {
        showModal && (

          <div className="modal-overlay">

            <div className="done-modal">

              <h2>

                Submit Work

              </h2>

              <textarea

                placeholder=
                "Write your answer"

                value={answerText}

                onChange={(e)=>

                  setAnswerText(
                    e.target.value
                  )
                }
              />

              <button
                onClick={
                  submitDoneAnswer
                }

                disabled={
                  submitting
                }
              >

                {
                  submitting

                  ?

                  "Submitting..."

                  :

                  "Submit"
                }

              </button>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Tasks;