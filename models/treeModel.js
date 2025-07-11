// Imports
    import mongoose from "mongoose";

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

        birthday: Date
    });

    const nodeSchema = new mongoose.Schema({
        person: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Person"
        },

        descendants: [{
            type: mongoose.SchemaTypes.ObjectId,
            reg: "Person"
        }]
    });

// Functions


// Exports
    export const Person = mongoose.model("Person", personSchema);
    export const Node = mongoose.model("Node", nodeSchema);