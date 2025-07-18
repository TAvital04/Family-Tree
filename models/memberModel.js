import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

const memberSchema = new mongoose.Schema({
    member: {
        firstname: {
            type: String
        },

        lastname: {
            type: String
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
    },

    descendants: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member"
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
    if(!this.member.firstname || this.member.firstname.trim() === "") {
        this.member.firstname = "Unnamed";
    }

    if(!this.member.lastname || this.member.lastname.trim() === "") {
        this.member.lastname = "Member";
    }

    this.slug = slugger.slug(`${this.member.firstname} ${this.member.lastname}`);

    next();
});

memberSchema.methods.getDescendants = function(result)
/*
    This method accepts a member object and an array and returns the result
    array with all the descendants that the member has. 
    
    It is called recursively such that all of its descendants contribute 
    to the array.

    It in performed as in-order and the result will be sorted descending by 
    rank and then by age.
*/
{
    result.push(this.member._id)
       
    // Traversal
    this.descendants.forEach((descendant) => {
        descendant.getDescendants(result);
    });

    return result;
}

memberSchema.methods.insertRoot = function(family)
/*
    This is a member that accepts a member object and a family and adds that member
    to the family's root. An added nuance to this is that if the root is full,
    the member in the root has to be added as a descendant to the new member.
*/
{
    const prevRoot = family.root;

    this.insertDescendant(prevRoot._id);

    family.root = this._id;
}

memberSchema.methods.insertDescendant = function(descendant)
/*
    This function will search for the parent node in the family tree and 
    add the descendant to the descendant sarray as an ID that points to the new member.
*/
{
    //TODO: ORDER BY DATE OF BIRTH

    this.descendants.push(descendant._id);
}

memberSchema.methods.find = function(id, found) 
/*
    This function will recursively traverse the tree in order to find and return
    a node with the same id as the one sent to it.
*/
{
    if(found) return found;

    if(this.id_ === id) {
        found = this._id;
        return found;
    }

    node.descendants.forEach((descendant) => {
        if(found) return found;

        descendant.find(id, found);
    });

    return found;
}

export const Member = mongoose.model("Member", memberSchema);