// =========================
// controllers/updateProjectStatus.js
// =========================

const Project =
require("../models/projectSchema");

const ProjectStatus =
require("../models/projectStatusSchema");

const updateProjectStatus =
async(req,res)=>{

    try{

        const {
            projectId,
            status,
            answer
        } = req.body;

        const userId =
        req.user.userId;

        // FIND PROJECT
        const project =
        await Project.findById(
            projectId
        );

        if(!project){

            return res.status(404)
            .json({

                message:
                "Project Not Found"
            });
        }

        // CHECK EXISTING
        let existing =
        await ProjectStatus.findOne({

            project:projectId,

            user:userId
        });

        // UPDATE
        if(existing){

            existing.status =
            status;

            existing.answer =
            answer;

            await existing.save();
        }

        // CREATE
        else{

            existing =
            new ProjectStatus({

                project:
                projectId,

                admin:
                project.admin,

                user:
                userId,

                status,

                answer
            });

            await existing.save();
        }

        res.status(200).json({

            message:
            "Status Updated"
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
updateProjectStatus;