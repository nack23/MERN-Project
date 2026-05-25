function Navbar() {

  return (

    <div className="navbar">

      <div className="navbar-left">

        <h1>

          Dashboard

        </h1>

        <p className="welcome-text">

          Welcome Back

          <span className="username">

            Admin

          </span>

        </p>

      </div>

      <button className="logout-btn">

        Logout

      </button>

    </div>
  );
}

export default Navbar;