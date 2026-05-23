const Project =
require("../models/projectSchema");

const createProject =
async(req,res)=>{

    try{

        const{

            projectName,

            description,

            dueDate,

            priority

        } = req.body;

        const newProject =
        await Project.create({

            projectName,

            description,

            dueDate,

            priority,

            admin:req.user.userId
        });

        res.status(201).json({

            message:
            "Project Created",

            project:newProject
        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            message:
            "Server Error"
        });
    }
};

module.exports =
createProject;