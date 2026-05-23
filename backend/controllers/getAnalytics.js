const mongoose =
require("mongoose");

const ProjectStatus =
require("../models/projectStatusSchema");

const getAnalytics =
async(req,res)=>{

    try{

        // LOGIN USER
        const adminId =
        new mongoose.Types.ObjectId(

            req.user.userId
        );

        // ALL TASKS
        const allTasks =
        await ProjectStatus.find({

            admin:adminId
        })

        .populate(
            "project"
        )

        .populate(
            "user",
            "name email"
        )

        .sort({
            updatedAt:-1
        });

        // TOTAL
        const totalTasks =
        allTasks.length;

        // COMPLETED
        const completedTasks =
        allTasks.filter(

            item=>
            item.status === "Done"

        ).length;

        // PENDING
        const pendingTasks =
        allTasks.filter(

            item=>
            item.status !== "Done"

        ).length;

        // DONE SUBMISSIONS
        const submissions =
        allTasks

        // RESPONSE
        res.status(200).json({

            totalTasks,

            completedTasks,

            pendingTasks,

            submissions
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
getAnalytics;