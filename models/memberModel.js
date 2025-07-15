import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

const memberSchema = new mongoose.Schema({
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
    if(!this.person.firstname || this.person.firstname.trim() === "") {
        this.person.firstname = "Unititled Member";
    }

    if(!this.person.isModified("firstname")) {
        return next();
    }

    this.slug = slugger.slug(this.person.firstname);
    next();
});

export const Member = mongoose.model("Member", memberSchema);