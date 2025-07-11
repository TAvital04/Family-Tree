// Objects
    import {Router} from "express";

    import {userRouter} from "./userRouter.js";

    export const router = Router();

// Routes
    router.get("/", (req, res) => {
        res.send("Home");
    });

    // Users
    router.use("/users", userRouter);

    // Trees
            