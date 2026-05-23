const express = require("express");

const router = express.Router();

const { signupData } = require("../controllers/signup-data");

const { loginData } = require("../controllers/login-data");

const dashboard = require("../controllers/dashboard");

const authMiddleware = require("../middleware/authMiddleware");
const logout = require("../controllers/logout");
const createProject =require("../controllers/createProject");
const getProjects =require("../controllers/getProjects");

const addMember =require("../controllers/addMember");

const removeMember =require("../controllers/removeMember");

const getTaskProjects =require("../controllers/getTaskProjects");
const updateProjectStatus =require("../controllers/updateProjectStatus");
const getAnalytics =require("../controllers/getAnalytics");

// Signup
router.post("/signup-data", signupData);

// Login
router.post("/login-data", loginData);

// Dashboard
router.get(
    "/dashboard",
    authMiddleware,
    dashboard
);

//logout
router.get("/logout", logout);
//porject add
router.post(
   "/create-project",
   authMiddleware,
   createProject
);
//project get
router.get(
   "/projects",
   authMiddleware,
   getProjects
);
//add member

router.post(
   "/add-member",
   authMiddleware,
   addMember
);
//remove member
router.post(
   "/remove-member",
   authMiddleware,
   removeMember
);


// GET TASK PROJECTS
router.get(

    "/task-projects",

    authMiddleware,

    getTaskProjects
);

// UPDATE STATUS
router.put(

    "/update-project-status",

    authMiddleware,

    updateProjectStatus
);
//analytics get
router.get(

    "/get-analytics",

     authMiddleware,

    getAnalytics
);

module.exports = router;