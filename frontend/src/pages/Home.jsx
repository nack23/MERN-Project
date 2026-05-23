import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {

  return (

    <div className="home-page">

      {/* Background Effects */}
      <div className="gradient-circle circle1"></div>
      <div className="gradient-circle circle2"></div>

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">

          <i className="fa-solid fa-brain"></i>

          <span>Ethara.AI</span>

        </div>

        <div className="nav-links">

          <a href="/">Research</a>

          <a href="/">Careers</a>

          <a href="/">Contact</a>

        </div>

      </nav>

      {/* Hero Section */}
      <div className="hero-section">

        <div className="hero-content">

          <h1>
            AGI is not born.
            <br />
            <span>It is trained.</span>
          </h1>

          <p>
            Ethara.AI operates at the frontier of next-generation
            intelligence systems, reinforcement learning environments,
            and AI-powered automation.
          </p>

          <div className="hero-buttons">

            <Link to="/login" className="hero-btn login-btn">

              <i className="fa-solid fa-right-to-bracket"></i>

              Login

            </Link>

            <Link to="/signup" className="hero-btn signup-btn">

              <i className="fa-solid fa-user-plus"></i>

              Sign Up

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;