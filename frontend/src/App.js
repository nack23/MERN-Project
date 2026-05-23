import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
              path="/projects"
              element={<Projects />}
        />

        <Route
              path="/tasks"
              element={<Tasks />}
        />

        <Route
path="/analytics"
element={<Analytics />}
/>



      </Routes>

    </BrowserRouter>

  );
}

export default App;