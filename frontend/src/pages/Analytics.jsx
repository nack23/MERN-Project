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

import axios
from "axios";

import "../styles/Analytics.css";

function Analytics(){

  const navigate =
  useNavigate();

  const [
    analytics,
    setAnalytics
  ] = useState({

    totalTasks:0,

    completedTasks:0,

    pendingTasks:0,

    submissions:[]
  });

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState("");

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

          return;
        }

        setError(
          "Failed to load analytics"
        );

      }finally{

        setLoading(false);
      }
    },

    [navigate]
  );

  useEffect(()=>{

    fetchAnalytics();

  },[fetchAnalytics]);

  return(

    <div className="analytics-page">

      <Sidebar />

      <div className="analytics-content">

        <h1>

          Analytics

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

              Loading Analytics...

            </div>

          ) : (

            <>

              <div className="analytics-stats">

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

              <div className="submission-section">

                <h2>

                  Latest Member Submissions

                </h2>

                {
                  analytics.submissions
                  .length === 0 ? (

                    <div className="no-submission">

                      <i className="fa-solid fa-chart-simple"></i>

                      <p>

                        No Submission Found

                      </p>

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

                            <h3>

                              {
                                item.project
                                ?.projectName
                              }

                            </h3>

                            <div
                            className="submission-description"
                            >

                              {
                                item.project
                                ?.description
                              }

                            </div>

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

            </>
          )
        }

      </div>

    </div>
  );
}

export default Analytics;