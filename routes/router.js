// Objects
    import {Router} from "express";

    import {userRouter} from "./userRouter.js";
    import { homeRouter } from "./homeRouter.js";
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

    // All families
    router.use("/families", homeRouter);

    // One family, all members
    router.use("/families/:familySlug", familyRouter);

    // One member
    router.use("/families/:familySlug/:memberSlug", memberRouter);