import userHandler from "../handlers/userHandler.js";
import {body, validationResult} from "express-validator";

// Register
    const registerForm = async (req, res) => {
        res.render("register", {
            title: "Register",
            flashes: req.flash()
        });
    }
    
    const register = async (req, res) => {
        const callback = (err, newUser) => {
            if(err) {
                res.render("register", {
                    title: "Register",
                    flashes: req.flash()
                });
            } else {
                res.render("login", {
                    title: "Login"
                });
            }
        }

        await userHandler.register({
            username: req.body.username,
            password: req.body.password,
            callback
        });
    }

    const validateRegister = [
        body("username").notEmpty().withMessage("Email address is required"),
        body("username").isEmail().withMessage("Please provide a valid email"),

        body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters"),

        body("confirm-password").custom((value, {req}) => {
            return value === req.body.password;
        }).withMessage("Passwords must match"),

        (req, res, next) => {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                req.flash("danger", errors.errors.map((err) => err.msg).join("; "));
                res.render("register", {
                    title: "Register",
                    flashes: req.flash()
                });
            } else {
                next();
            }
        }
    ]

// Login
    const loginForm = async (req, res) => {
        res.render("login", {
            title: "Login"
        });
    }

export default {
    registerForm,
    register,
    validateRegister,

    loginForm
}