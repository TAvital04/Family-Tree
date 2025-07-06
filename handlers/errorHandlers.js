export const catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    }
}

export const notFound = (req, res, next) => {
    const err = new Error("Not Found :(");
    err.status = 404;

    next(err);
}

export const flashValidationErrors = (err, req, res, next) => {
    if(!err.errors) return next(err);

    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach((key) => req.flash("error", err.errrs[key].message));
    res.redirect("/");
}