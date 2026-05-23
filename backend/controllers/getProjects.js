const Project =
require("../models/projectSchema");

const getProjects = async (
    req,
    res
) => {

    try {

        // Logged In User
        const userId =
            req.user.userId;

        // Only User Projects
        const projects =
            await Project.find({

                admin:userId
            })

            .populate(
                "members",
                "name email"
            )

            .populate(
                "admin",
                "name email"
            )

            .sort({
                createdAt:-1
            });

        res.status(200).json(
            projects
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
            "Server Error"
        });
    }
};

module.exports =
getProjects;