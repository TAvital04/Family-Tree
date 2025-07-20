import passport from "passport";

// Login
    const login = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/register",
        faulureFlash: "Invalid Login"
    });

// Logout
    const logout = (req, res, next) => {
        req.logout((err) => {
            if(err) {
                return next(err);
            }
        });

        req.flash("success", "Logout Successful");
        res.render("users/home", {
            title: "Home",
            flashes: req.flash()
        });
    }

// Authentication
    const isAuthenticated = async (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash("danger", "Please log in.");
        res.render("users/login", {
            title: "Login",
            flashes: req.flash()
        });
    }

export default {
    login,
    logout,

    isAuthenticated
}