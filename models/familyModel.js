// Imports
    import mongoose from "mongoose";

    import GitHubSlugger from "github-slugger";
    const slugger = new GitHubSlugger();

// Schemas
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

    const familySchema = new mongoose.Schema({
        title: {
            type: String
        },

        node: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Member"
        },

        slug: {
            type: String
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    });

// Functions
    familySchema.pre("save", function (next) {
        if(!this.title || this.title.trim() === "") {
            this.title = "Untitled Tree";
        }

        if(!this.isModified("title")) {
            return next();
        }

        this.slug = slugger.slug(this.title);
        next();
    });

// Exports
    export const Person = mongoose.model("Person", personSchema);
    export const Member = mongoose.model("Member", memberSchema);
    export const Family = mongoose.model("Family", familySchema);