import {
  useEffect,
  useState
} from "react";

import Sidebar
from "../components/Sidebar";

import "../styles/Tasks.css";

function Tasks(){

  const [projects,setProjects] =
  useState([]);

  // MODAL

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

  // FETCH PROJECTS

  const fetchProjects =
  async()=>{

    try{

      const response =
      await fetch(

        "http://localhost:5000/task-projects",

        {
          credentials:"include"
        }
      );

      const data =
      await response.json();

      setProjects(data);

    }catch(error){

      console.log(error);
    }
  };

  useEffect(()=>{

    fetchProjects();

  },[]);

  // UPDATE STATUS

  const updateStatus =
  async(

    projectId,
    status,
    answer

  )=>{

    try{

      await fetch(

        "http://localhost:5000/update-project-status",

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

      fetchProjects();

    }catch(error){

      console.log(error);
    }
  };

  // HANDLE STATUS

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

  // SUBMIT ANSWER

  const submitDoneAnswer =
  async()=>{

    if(!answerText.trim()){

      return;
    }

    try{

      await fetch(

        "http://localhost:5000/update-project-status",

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

      setShowModal(false);

      setAnswerText("");

      fetchProjects();

    }catch(error){

      console.log(error);
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
          projects.length === 0 ? (

            <div className="no-task">

              No Tasks Available

            </div>

          ) : (

            <div className="task-grid">

              {
                projects.map((project)=>(

                  <div
                  className="task-card"
                  key={project._id}
                  >

                    {/* TITLE */}

                    <h2>

                      {
                        project.projectName
                      }

                    </h2>

                    {/* DESCRIPTION */}

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

                    {/* INFO */}

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

                    {/* STATUS */}

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

                    {/* ANSWER */}

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

      {/* MODAL */}

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
              >

                Submit

              </button>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Tasks;