import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

import memberHandler from "../handlers/memberHandler.js"

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

memberSchema.methods.getDescendants = async function (result) {
    result.push(this._id)

    let temp;
    
    for(const descendant of this.descendants) {
        temp = await memberHandler.getOneMemberById({id: descendant});
        await temp.getDescendants(result);
    }

    return result;
}

memberSchema.methods.insertDescendant = function (descendant) {
    this.descendants.push(descendant._id);

    this.save();
}

memberSchema.methods.find = function (id, found) {
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