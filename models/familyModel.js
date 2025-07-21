import mongoose from "mongoose";

import GitHubSlugger from "github-slugger";
const slugger = new GitHubSlugger();

import memberHandler from "../handlers/memberHandler.js";
import familyHandler from "../handlers/familyHandler.js";

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
        ref: "User",
        required: true
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

    if(prevRoot) {
        await member.insertMember(prevRoot._id);
    }

    this.root = member._id;
    
    await this.save();
}

familySchema.methods.getMembers = async function () {
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        return await root.getMembers();
    }
}

familySchema.methods.getMembersAsObjects = async function () {
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        return await root.getMembersAsObjects();
    }
}

familySchema.methods.findMember = async function (parameters) {
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        return await root.findMember(parameters);
    }
}

familySchema.methods.findMembers = async function (parameters) {
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        return await root.findMembers(parameters);
    }
}

familySchema.methods.deleteFamily = async function () {
    const root = await memberHandler.getOneMember(this.root);

    if(root) {
        root.deleteMemberAndDescendants()
    }

    familyHandler.deleteFamily(this._id);
}

export const Family = mongoose.model("Family", familySchema);