const Project =
require("../models/projectSchema");

const User =
require("../models/userSchema");

const removeMember = async (
    req,
    res
) => {

    try {

        const {
            projectId,
            email
        } = req.body;

        // Find User
        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(404).json({

                message:
                  "User Not Found"
            });
        }

        // Find Project
        const project =
            await Project.findById(
                projectId
            );

        if (!project) {

            return res.status(404).json({

                message:
                  "Project Not Found"
            });
        }

        // Remove Member
        project.members =
            project.members.filter(
                (memberId) =>

                    memberId.toString() !==
                    user._id.toString()
            );

        await project.save();

        res.status(200).json({

            message:
              "Member Removed"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
              "Server Error"
        });
    }
};

module.exports =
removeMember;