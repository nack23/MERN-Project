import {
  useEffect,
  useState
} from "react";

import Sidebar
from "../components/Sidebar";

import axios
from "axios";

import "../styles/Analytics.css";

function Analytics(){

  const [
    analytics,
    setAnalytics
  ] = useState({

    totalTasks:0,

    completedTasks:0,

    pendingTasks:0,

    submissions:[]
  });

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

  // USE EFFECT

  useEffect(()=>{

    fetchAnalytics();

  },[]);

  return(

    <div className="analytics-page">

      <Sidebar />

      <div className="analytics-content">

        {/* TITLE */}

        <h1>

          Analytics

        </h1>

        {/* STATS */}

        <div className="analytics-stats">

          {/* TOTAL */}

          <div className="analytics-box">

            <h3>

              Total Tasks

            </h3>

            <h2>

              {
                analytics.totalTasks
              }

            </h2>

          </div>

          {/* COMPLETED */}

          <div className="analytics-box">

            <h3>

              Completed

            </h3>

            <h2>

              {
                analytics.completedTasks
              }

            </h2>

          </div>

          {/* PENDING */}

          <div className="analytics-box">

            <h3>

              Pending

            </h3>

            <h2>

              {
                analytics.pendingTasks
              }

            </h2>

          </div>

        </div>

        {/* STATUS GUIDE */}

        <div className="status-guide">

          <div className="guide-item">

            <span className="guide-color done-guide">

            </span>

            <p>

              Green = Done

            </p>

          </div>

          <div className="guide-item">

            <span className="guide-color progress-guide">

            </span>

            <p>

              Orange = In Progress

            </p>

          </div>

          <div className="guide-item">

            <span className="guide-color todo-guide">

            </span>

            <p>

              Red = To Do

            </p>

          </div>

        </div>

        {/* SUBMISSIONS */}

        <div className="submission-section">

          <h2>

            Latest Member Submissions

          </h2>

          {
            analytics.submissions
            .length === 0 ? (

              <div className="no-submission">

                No Submission Found

              </div>

            ) : (

              <div className="submission-grid">

                {
                  analytics.submissions
                  .map((item)=>(

                    <div
                    className="submission-card"
                    key={item._id}
                    >

                      {/* PROJECT */}

                      <h3>

                        {
                          item.project
                          ?.projectName
                        }

                      </h3>

                      {/* DESCRIPTION */}

                      <div
                      className="submission-description"
                      >

                        {
                          item.project
                          ?.description
                        }

                      </div>

                      {/* INFO */}

                      <div
                      className="submission-info"
                      >

                        <span>

                          Member:
                          {
                            item.user
                            ?.name
                          }

                        </span>

                        <span
                        className={

                          item.status ===
                          "Done"

                          ? "done-status"

                          : item.status ===
                          "In Progress"

                          ? "progress-status"

                          : "todo-status"
                        }
                        >

                          {
                            item.status
                          }

                        </span>

                      </div>

                      {/* ANSWER */}

                      {
                        item.answer &&
                        (

                          <div
                          className="answer-container"
                          >

                            <h4>

                              Submitted Answer

                            </h4>

                            <p>

                              {
                                item.answer
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

      </div>

    </div>
  );
}

export default Analytics;