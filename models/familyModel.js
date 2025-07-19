import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

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

    if(!this.isModified("title")) {
        return next();
    }

    this.slug = slugger.slug(this.title);
    next();
});

familySchema.methods.insertRoot = async function (newRoot)
/*
    This is a member that accepts a member object and a family and adds that member
    to the family's root. An added nuance to this is that if the root is full,
    the member in the root has to be added as a descendant to the new member.
*/
{
    const prevRoot = this.root;

    if(prevRoot) newRoot.insertDescendant(prevRoot._id);

    this.root = newRoot._id;
    
    await this.save();
}

export const Family = mongoose.model("Family", familySchema);