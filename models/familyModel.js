import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

import memberHandler from "../handlers/memberHandler.js";

const familySchema = new mongoose.Schema({
    title: {
        type: String,
    },

    root: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member",
        default: undefined
    },

    slug: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

familySchema.pre("save", function (next) {
    if(!this.title || this.title.trim() === "") {
        this.title = "Untitled Family";
    }

    this.slug = slugger.slug(this.title);
    next();
});

familySchema.methods.insertRoot = async function (member)
/*
    - Insert a Member at the root of the Family

    - If the Family already has a root, replace the old root with the new
        one, and then add the old root as a decendent of the new root
*/
{
    const prevRoot = this.root;

    if(prevRoot) member.insertDescendant(prevRoot._id);

    this.root = member._id;
    
    await this.save();
}

familySchema.methods.getMembers = async function () 
/*
    - Call the Member model's function traverse() to traverse all the Members
        that descend from the Family's root such that it returns an array 
        of their pointers
*/
{
    const backpack = [];

    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        await root.traverse((member, {backpack}) => {
            backpack.push(member);
        }, {backpack});
    }

    return backpack;
}

familySchema.methods.deleteFamily = async function ()
/*
    - Call the Member model's function traverseReverse() to traverse all the Members
        that descend from the Family's root such that it deletes every member
*/
{
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        root.deleteMemberAndDescendants()
    }
}

familySchema.methods.deleteMemberAndDescendants = async function ({...parameters})
/*

*/
{
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        const result = await root.findOne({...parameters});
        result.deleteMemberAndDescendants();
    }
}

export const Family = mongoose.model("Family", familySchema);