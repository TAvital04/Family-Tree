import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

const personSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [20, "First name max length is 20 characters"]
    },

    lastname: {
        type: String,
        required: [true, "Last name is required"],
        maxlength: [30, "Last name max length is 50 characters"]
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