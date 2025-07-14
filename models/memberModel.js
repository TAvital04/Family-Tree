import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

const memberSchema = new mongoose.Schema({
    title: {
        type: String
    },

    person: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Person"
    },

    descendants: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Person"
    }],

    slug: {
        type: String,
        require: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

memberSchema.pre("save", function (next) {
    if(!this.title || this.title.trim() === "") {
        this.title = "Unititled Member";
    }

    if(!this.isModified("title")) {
        return next();
    }

    this.slug = slugger.slug(this.title);
    next();
});

export const Member = mongoose.model("Member", memberSchema);