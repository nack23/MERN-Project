const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const signupData = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Empty check
        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({

            name,
            email,
            password: hashedPassword

        });

        await newUser.save();

        res.status(201).json({
            message: "Signup Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = { signupData };