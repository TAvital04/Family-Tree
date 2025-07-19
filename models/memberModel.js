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
            type: Date,
            default: Date.now()
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

memberSchema.methods.traverse = async function (operation, backpack = {})
/*
    - Traverse every descendent of a Member, and of their descendants, recursively,
        and perform the given operation on all of them
*/
{
    await operation(this, backpack);

    for(const descendantId of this.descendants) {
        const descendant = await memberHandler.getOneMember(descendantId);

        if(descendant) {
            await descendant.traverse(operation, backpack);
        }
    }
}

memberSchema.methods.traverseReverse = async function (operation, backpack = {})
/*
    - Traverse every descendent of a Member, and of their descendants, recursively,
        in reverse, and perform the given operation on all of them
*/
{
    for(const descendantId of this.descendants) {
        const descendant = await memberHandler.getOneMember(descendantId);

        if(descendant) {
            await descendant.traverseReverse(operation, backpack);
        }
    }

    await operation(this, backpack);
}

memberSchema.methods.deleteMemberAndDescendants = async function ()
/*

*/
{
    await this.traverseReverse(async (member) => {
        await memberHandler.deleteMember(member._id);
    });
}

memberSchema.methods.findOne = async function ({...parameters})
/*

*/
{
    const result = {result: null}

    await this.traverse(async (member, backpack) => {
        if(backpack.result) return;

        let isMatch = true;

        for(const key in parameters) {
            if(member[key] != parameters[key]) {
                isMatch = false;
                break;
            }
        }

        if(isMatch) {
            backpack.result = member;
        }
    }, result)

    return result.result;
}

memberSchema.methods.insertDescendant = function (descendant) {
    this.descendants.push(descendant._id);

    this.save();
}

export const Member = mongoose.model("Member", memberSchema);