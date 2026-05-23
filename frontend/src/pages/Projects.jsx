import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import "../styles/Projects.css";

function Projects() {

  const [projectName, setProjectName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [projects, setProjects] =
    useState([]);

  const [
    successMessage,
    setSuccessMessage
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage
  ] = useState("");

  // MEMBER ERROR
  const [
    memberError,
    setMemberError
  ] = useState({});

  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/projects",
        {
          method: "GET",

          credentials: "include"
        }
      );

      const data =
        await response.json();

      setProjects(
        data.reverse()
      );

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchProjects();

  }, []);

  // =========================
  // SUCCESS MESSAGE
  // =========================

  const showSuccess = (message) => {

    setSuccessMessage(message);

    setTimeout(() => {

      setSuccessMessage("");

    }, 3000);
  };

  // =========================
  // ERROR MESSAGE
  // =========================

  const showError = (message) => {

    setErrorMessage(message);

    setTimeout(() => {

      setErrorMessage("");

    }, 3000);
  };

  // =========================
  // CREATE PROJECT
  // =========================

  const handleCreateProject =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await fetch(
            "http://localhost:5000/create-project",
            {
              method: "POST",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                projectName,

                description,

                dueDate,

                priority
              })
            }
          );

        const data =
          await response.json();

        // ERROR
        if (!response.ok) {

          showError(data.message);

          return;
        }

        // SUCCESS
        showSuccess(data.message);

        fetchProjects();

        setProjectName("");

        setDescription("");

        setDueDate("");

        setPriority("Medium");

      } catch (error) {

        console.log(error);

        showError("Server Error");
      }
    };

  // =========================
  // ADD MEMBER
  // =========================

  const addMember = async (
    e,
    projectId
  ) => {

    e.preventDefault();

    const email =
      e.target.email.value;

    try {

      const response =
        await fetch(
          "http://localhost:5000/add-member",
          {
            method: "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              projectId,

              email
            })
          }
        );

      const data =
        await response.json();

      // ERROR
      if (!response.ok) {

        setMemberError({

          ...memberError,

          [projectId]:
          data.message
        });

        setTimeout(() => {

          setMemberError(
            (prev) => ({

              ...prev,

              [projectId]: ""
            })
          );

        }, 3000);

        return;
      }

      // SUCCESS
      showSuccess(data.message);

      fetchProjects();

      e.target.reset();

      // CLEAR ERROR
      setMemberError({

        ...memberError,

        [projectId]: ""
      });

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // REMOVE MEMBER
  // =========================

  const removeMember = async (
    projectId,
    email
  ) => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/remove-member",
          {
            method: "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              projectId,

              email
            })
          }
        );

      const data =
        await response.json();

      // ERROR
      if (!response.ok) {

        showError(data.message);

        return;
      }

      // SUCCESS
      showSuccess(data.message);

      fetchProjects();

    } catch (error) {

      console.log(error);

      showError("Server Error");
    }
  };

  return (

    <div className="projects-page">

      <Sidebar />

      <div className="projects-content">

        <h1>

          Create Project

        </h1>

        {/* SUCCESS */}

        {
          successMessage && (

            <div className="success-message">

              {successMessage}

            </div>
          )
        }

        {/* ERROR */}

        {
          errorMessage && (

            <div className="error-message">

              {errorMessage}

            </div>
          )
        }

        {/* =========================
            FORM
        ========================= */}

        <form
          className="project-form"
          onSubmit={
            handleCreateProject
          }
        >

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(
                e.target.value
              )
            }
            required
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
          >

            <option value="Low">

              Low

            </option>

            <option value="Medium">

              Medium

            </option>

            <option value="High">

              High

            </option>

          </select>

          <button type="submit">

            + Create Project

          </button>

        </form>

        {/* =========================
            PROJECTS
        ========================= */}

        <div className="project-list">

          {
            projects.length === 0

            ? (

              <div className="empty">

                <h2>

                  No Projects Yet

                </h2>

                <p>

                  Create your first
                  project

                </p>

              </div>
            )

            : (

              projects.map(
                (project) => (

                  <div
                    className="project-card"
                    key={project._id}
                  >

                    {/* ICON */}

                    <div className="project-icon">

                      <i className="fa-solid fa-folder-open"></i>

                    </div>

                    {/* TITLE */}

                    <h2>

                      {
                        project.projectName
                      }

                    </h2>

                    {/* DESCRIPTION */}
<div className="project-description">

  {project.description}

</div>

                    {/* DUE DATE */}

                    <p className="due-date">

                      <strong>

                        Due Date:

                      </strong>

                      {

                        project.dueDate

                        ?

                        new Date(
                          project.dueDate
                        ).toLocaleDateString()

                        :

                        " N/A"
                      }

                    </p>

                    {/* PRIORITY */}

                    <div
                      className={`priority ${
                        project.priority
                        ?.toLowerCase()
                      }`}
                    >

                      {
                        project.priority ||
                        "Medium"
                      }

                    </div>

                    {/* MEMBERS */}

                    <div className="members-section">

                      <h4>

                        Members

                      </h4>

                      {
                        project.members
                          .length === 0

                        ? (

                          <p className="no-members">

                            No Members

                          </p>
                        )

                        : (

                          project.members.map(

                            (
                              member,
                              index
                            ) => (

                              <div
                                className="member-item"
                                key={index}
                              >

                                <div className="member-info">

                                  <h5>

                                    {
                                      member.name
                                    }

                                  </h5>

                                  <p>

                                    {
                                      member.email
                                    }

                                  </p>

                                </div>

                                <button
                                  className="remove-btn"
                                  onClick={() =>
                                    removeMember(
                                      project._id,
                                      member.email
                                    )
                                  }
                                >

                                  <i className="fa-solid fa-trash"></i>

                                </button>

                              </div>
                            )
                          )
                        )
                      }

                    </div>

                    {/* MEMBER ERROR */}

                    {
                      memberError[
                        project._id
                      ] && (

                        <div className="member-error">

                          {
                            memberError[
                              project._id
                            ]
                          }

                        </div>
                      )
                    }

                    {/* ADD MEMBER */}

                    <form
                      className="member-form"
                      onSubmit={(e) =>
                        addMember(
                          e,
                          project._id
                        )
                      }
                    >

                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Member Email"
                        required
                      />

                      <button type="submit">

                        Add Member

                      </button>

                    </form>

                  </div>
                )
              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Projects;