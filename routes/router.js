// Objects
    import {Router} from "express";

    import {userRouter} from "./userRouter.js";
    import { homeRouter } from "./homeRouter.js";
    import {familyRouter} from "./familyRouter.js";
    import {memberRouter} from "./memberRouter.js";

    export const router = Router();

// Routes
    router.get("/", (req, res) => {
        res.redirect("/families");
    });

    // Users
    router.use("/users", userRouter);

    // All families
    router.use("/families", homeRouter);

    // One family, all members
    router.use("/families/:familyTarget", familyRouter);

    // One member
    router.use("/families/:familyTarget/:memberTarget", memberRouter);