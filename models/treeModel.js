// Imports
    import mongoose from "mongoose";

// Schemas
    const rootSchema = new mongoose.Schema({
        node: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Node"
        }
    });

    const nodeSchema = new mongoose.Schema({
        parents: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Node",
            validate: arrayLimit
        }],
        spouse: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Node",
            validate: arrayLimit
        }],
        children: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Node"
        }]
    })

    function arrayLimit(array) {
        return array.length <= 2;
    }

// Functions
    