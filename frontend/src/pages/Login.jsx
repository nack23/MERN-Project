import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "../styles/Login.css";

function Login() {

  const navigate =
  useNavigate();

  const [
    email,
    setEmail
  ] = useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const [
    message,
    setMessage
  ] = useState("");

  const [
    messageType,
    setMessageType
  ] = useState("");

  // LOGIN

  const handleLogin =
  async(e)=>{

    e.preventDefault();

    // CLEAR OLD MESSAGE

    setMessage("");

    try{

      const response =
      await fetch(

        "http://localhost:5000/login-data",

        {
          method:"POST",

          credentials:"include",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify({

            email,
            password
          })
        }
      );

      const data =
      await response.json();

      // SUCCESS LOGIN

      if(response.ok){

        localStorage.setItem(

          "userEmail",
          email
        );

        navigate(
          "/dashboard"
        );

      }else{

        setMessage(
          "Something went wrong"
        );

        setMessageType(
          "error"
        );
      }

    }catch(error){

      console.log(error);

      setMessage(
        "Something went wrong"
      );

      setMessageType(
        "error"
      );
    }
  };

  return(

    <div className="login-page">

      <div className="login-container">

        <h1>

          Login

        </h1>

        {/* ERROR MESSAGE */}

        {
          message && (

            <div
            className={`auth-message ${
              messageType === "success"
              ? "auth-success"
              : "auth-error"
            }`}
            >

              {message}

            </div>
          )
        }

        {/* FORM */}

        <form
        onSubmit={handleLogin}
        >

          <input
            type="email"

            placeholder=
            "Enter your email"

            value={email}

            onChange={(e)=>

              setEmail(
                e.target.value
              )
            }

            required
          />

          <input
            type="password"

            placeholder=
            "Enter your password"

            value={password}

            onChange={(e)=>

              setPassword(
                e.target.value
              )
            }

            required
          />

          <button
          type="submit"
          >

            Login

          </button>

        </form>

        {/* SIGNUP */}

        <p>

          Don't have an account?

          <Link to="/signup">

            Signup

          </Link>

        </p>

        {/* BACK HOME */}

        <Link
        to="/"

        className=
        "back-home"
        >

          Back Home

        </Link>

      </div>

    </div>
  );
}

export default Login;