// Objects
    import express from "express";
    import morgan from "morgan";

    import {router} from "./routes/router.js";

    import {fileURLToPath} from "url";
    import path from "path";

    import passport from "passport";
    import "./handlers/passport.js";
    import session from "express-session";
    import MongoStore from "connect-mongo";

    import flash from "connect-flash";
    import {notFound, flashValidationErrors} from "./handlers/errorHandlers.js";

    import methodOverride from "method-override";

// App
    export const app = express();

// Middleware
    app.use(morgan("dev"));

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(methodOverride("_method"));

    app.set("view engine", "ejs");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.set("views", path.join(__dirname, "views"));
    app.use(express.static(path.join(__dirname, "public")));

    app.use(
        session({
            secret: process.env.PASSPORT_SECRET,
            key: process.env.PASSPORT_COOKIE_KEY,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.DB_CONN
            })
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    app.use((req, res, next) => {
        res.locals.user = req.user;
        res.locals.flashes = req.flash();
        next();
    });

// Router
    app.use("/", router);

// Errors
    //app.use(notFound);
    app.use(flashValidationErrors);