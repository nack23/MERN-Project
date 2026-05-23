
const Project =
require("../models/projectSchema");

const ProjectStatus =
require("../models/projectStatusSchema");

const getTaskProjects =
async(req,res)=>{

    try{

        const userId =
        req.user.userId;

        // FIND PROJECTS
        const projects =
        await Project.find({

            members:userId
        })

        .populate(
            "admin",
            "name email"
        )

        .populate(
            "members",
            "name email"
        )

        .sort({
            createdAt:-1
        });

        // GET STATUS
        const projectData =
        await Promise.all(

            projects.map(
                async(project)=>{

                    const statusData =
                    await ProjectStatus.findOne({

                        project:
                        project._id,

                        user:userId
                    });

                    return{

                        ...project.toObject(),

                        currentStatus:
                        statusData
                        ?.status || "To Do",

                        currentAnswer:
                        statusData
                        ?.answer || ""
                    };
                }
            )
        );

        res.status(200).json(
            projectData
        );

    }catch(error){

        console.log(error);

        res.status(500).json({

            message:
            "Server Error"
        });
    }
};

module.exports =
getTaskProjects;