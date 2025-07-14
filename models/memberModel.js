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
    }]
});

export const Member = mongoose.model("Member", memberSchema);