// Objects
    import {Router} from "express";

    import {userRouter} from "./userRouter.js";
    import {familyRouter} from "./familyRouter.js";
    import {memberRouter} from "./memberRouter.js";

    export const router = Router();

// Routes
    router.get("/", (req, res) => {
        res.render("home", {
            title: "Home"
        });
    });

    // Users
    router.use("/users", userRouter);

    // Families
    router.use("/families", familyRouter);

    // Members
    router.use("/families/:family-slug/:member-slug", memberRouter);