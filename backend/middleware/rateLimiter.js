const rateLimit = require("express-rate-limit");

const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many signup attempts. Try again later."
    }
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: "Too many login attempts. Try again later."
    }
});

module.exports = {
    signupLimiter,
    loginLimiter
};
