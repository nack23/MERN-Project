import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "../styles/Signup.css";

function Signup(){

  const navigate =
  useNavigate();

  const [
    name,
    setName
  ] = useState("");

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

  // SIGNUP

  const handleSignup =
  async(e)=>{

    e.preventDefault();

    // EMPTY CHECK

    if(
      !name ||
      !email ||
      !password
    ){

      setMessage(
        "Please fill all fields"
      );

      setMessageType(
        "error"
      );

      return;
    }

    try{

      const response =
      await fetch(

        "http://localhost:5000/signup-data",

        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify({

            name,
            email,
            password
          })
        }
      );

      const data =
      await response.json();

      // SUCCESS

      if(response.ok){

        setMessage(
          "Account created successfully"
        );

        setMessageType(
          "success"
        );

        // CLEAR INPUTS

        setName("");
        setEmail("");
        setPassword("");

        // REDIRECT

        setTimeout(()=>{

          navigate(
            "/login"
          );

        },1500);

      }else{

        setMessage(

          data.message ||
          "Something went wrong"
        );

        setMessageType(
          "error"
        );
      }

    }catch(error){

      console.log(error);

      setMessage(
        "Server Error"
      );

      setMessageType(
        "error"
      );
    }
  };

  return(

    <div className="signup-page">

      <div className="signup-container">

        <h1>

          Sign Up

        </h1>

        {/* MESSAGE */}

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
        onSubmit={handleSignup}
        >

          <input
            type="text"

            placeholder=
            "Enter your name"

            value={name}

            onChange={(e)=>

              setName(
                e.target.value
              )
            }
          />

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
          />

          <input
            type="password"

            placeholder=
            "Create password"

            value={password}

            onChange={(e)=>

              setPassword(
                e.target.value
              )
            }
          />

          <button
          type="submit"
          >

            Create Account

          </button>

        </form>

        {/* LOGIN */}

        <p>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

        {/* HOME */}

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

export default Signup;