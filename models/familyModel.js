import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

const familySchema = new mongoose.Schema({
    title: {
        type: String,
    },

    root: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member",
        default: undefined
    },

    slug: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

familySchema.pre("save", function (next) {
    if(!this.title || this.title.trim() === "") {
        this.title = "Untitled Family";
    }

    if(!this.isModified("title")) {
        return next();
    }

    this.slug = slugger.slug(this.title);
    next();
});

export const Family = mongoose.model("Family", familySchema);