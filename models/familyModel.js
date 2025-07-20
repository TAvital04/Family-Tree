import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

import memberHandler from "../handlers/memberHandler.js";
import familyHandler from "../handlers/familyHandler.js";
import userHandler from "../handlers/userHandler.js";

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

familySchema.methods.insertRoot = async function (member) {
    const prevRoot = this.root;

    if(prevRoot) await member.insertDescendant(prevRoot._id);

    this.root = member._id;
    
    await this.save();
}

familySchema.methods.getMembers = async function () {
    const backpack = [];

    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        await root.traverse((member, {backpack}) => {
            backpack.push(member);
        }, {backpack});
    }

    return backpack;
}

familySchema.methods.findMember = async function (parameters) {
    let result;

    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        result = await root.findOne(parameters);
    }

    return result;
}

familySchema.methods.deleteFamily = async function () {
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        root.deleteMemberAndDescendants()
    }

    familyHandler.deleteFamily(this._id);
}

export const Family = mongoose.model("Family", familySchema);