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

export const Member = mongoose.model("Member", memberSchema);