const User = require("../models/userSchema");

const dashboard = async (req, res) => {

    try {

        // Find logged in user
        const user = await User.findById(
            req.user.userId
        ).select("-password");

        res.status(200).json({

            message: "Welcome Dashboard",

            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"
        });
    }
};

module.exports = dashboard;