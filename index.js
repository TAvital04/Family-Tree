// Objects
    import dotenv from "dotenv";
    dotenv.config();

    const {app} = await import("./app.js");

    const {connect} = await import("./connect.js");

// Connect to the app
    app.listen(process.env.PORT, () => {
        console.log(`(1/2) Server running at localhost:${process.env.PORT} :D`);
    });

// Connect to MongoDB
    await connect(process.env.DB_CONN);
    console.log(`(2/2) MongoDB connected at ${process.env.DB_CONN} :D`);