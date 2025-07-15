import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

const personSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: "Unnamed"
    },

    lastname: {
        type: String,
        default: "Member"
    },

    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Other/Prefer not to say"],
            message: "{VALUE} is not a valid gender"
        }
    },

    birthday: {
        type: Date
    }
});

export const Person = mongoose.model("Person", personSchema);