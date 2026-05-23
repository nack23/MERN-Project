const Project =
require("../models/projectSchema");

const User =
require("../models/userSchema");

const ProjectStatus =
require("../models/projectStatusSchema");

/* ADD MEMBER */

const addMember = async (
    req,
    res
) => {

    try {

        const {
            projectId,
            email
        } = req.body;

        // CHECK EMAIL

        if (!email) {

            return res.status(400).json({

                success:false,

                message:
                "Email is required"
            });
        }

        // FIND USER

        const user =
        await User.findOne({

            email
        });

        // MEMBER NOT FOUND

        if (!user) {

            return res.status(404).json({

                success:false,

                message:
                "Member Not Found"
            });
        }

        // FIND PROJECT

        const project =
        await Project.findById(
            projectId
        );

        // PROJECT NOT FOUND

        if (!project) {

            return res.status(404).json({

                success:false,

                message:
                "Project Not Found"
            });
        }

        // ALREADY MEMBER

        const alreadyMember =
        project.members.some(

            (member)=>

                member.toString() ===
                user._id.toString()
        );

        if (alreadyMember) {

            return res.status(400).json({

                success:false,

                message:
                "User Already Member"
            });
        }

        // ADD MEMBER

        project.members.push(
            user._id
        );

        await project.save();

        // CREATE TODO STATUS

        await ProjectStatus.create({

            project:
            project._id,

            admin:
            project.admin,

            user:
            user._id,

            status:
            "To Do",

            answer:""
        });

        // POPULATE MEMBERS

        const updatedProject =
        await Project.findById(
            projectId
        )

        .populate(
            "members",
            "name email"
        );

        // SUCCESS

        res.status(200).json({

            success:true,

            message:
            "Member Added Successfully",

            project:
            updatedProject
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success:false,

            message:
            "Server Error"
        });
    }
};

module.exports =
addMember;