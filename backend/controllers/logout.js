const logout = async (req, res) => {

    try {

        // Remove Cookie
        res.clearCookie("token");

        res.status(200).json({

            message: "Logout Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"
        });
    }
};

module.exports = logout;