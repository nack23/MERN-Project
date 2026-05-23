const User = require("../models/userSchema");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const loginData = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Empty fields
        if (!email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // JWT Token
        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }
        );

        // Send cookie
        res.cookie("token", token, {

            httpOnly: true,

            secure: false,

            sameSite: "lax"
        });

        res.status(200).json({

            message: "Login Successful",

            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = { loginData };