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

memberSchema.methods.insertMember = async function (descendant) {
    this.descendants.push(descendant._id);

    await this.save();
}

memberSchema.methods.traverse = async function (operation, backpack = {}) {
    await operation(this, backpack);

    for(const descendantId of this.descendants) {
        const descendant = await memberHandler.getOneMember(descendantId);

        if(descendant) {
            await descendant.traverse(operation, backpack);
        }
    }
}

memberSchema.methods.traverseReverse = async function (operation, backpack = {}) {
    for(const descendantId of this.descendants) {
        const descendant = await memberHandler.getOneMember(descendantId);

        if(descendant) {
            await descendant.traverseReverse(operation, backpack);
        }
    }

    await operation(this, backpack);
}

memberSchema.methods.getMembers = async function () {
    const result = [];

    await this.traverse((member, backpack) => {
        backpack.push(member);
    }, result);

    return result;
}

memberSchema.methods.getMembersAsObjects = async function () {
    const tree = async (member) => {
        const memberObject = {
            ...member.member,
            _id: member._id,
            slug: member.slug,
            descendants: []
        };

        for(const descendantId of member.descendants) {
            const descendant = await memberHandler.getOneMember(descendantId);
            const descendantTree = await tree(descendant);

            memberObject.descendants.push(descendantTree);
        }

        return memberObject;
    }

    return await tree(this);
}

memberSchema.methods.findMember = async function (parameters) {
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

memberSchema.methods.findMembers = async function (parameters) {
    const result = [];

    await this.traverse(async (member, backpack) => {
        let isMatch = false;

        for(const key in parameters) {
            if(member.member[key] == parameters[key]) {
                isMatch = true;
                break;
            }
        }

        if(isMatch) {
            backpack.push(member);
        }
    }, result)

    return result;
}

memberSchema.methods.deleteMember = async function (family) {
    const context = {
        prev: null,
        result: null
    };

    const root = await memberHandler.getOneMember(family.root);

    await root.traverse(async (member, backpack) => {
        if(member._id.equals(this._id)) {
            backpack.result = backpack.prev;
            return;
        } else {
            backpack.prev = member;
        }
    }, context);

    const parent = context.result;

    if(parent) {
        for(const memberId of this.descendants) {
            parent.descendants.push(memberId);
        }

        const index = parent.descendants.indexOf(this._id);
        if(index > -1) {
            parent.descendants.splice(index, 1);
        }

        await parent.save();
    } else {
        if(this.descendants.length > 1) {
            const newRoot = await memberHandler.createMember({
                firstname: "",
                lastname: "",
                gender: "",
                birthday: ""
            });

            for(const memberId of this.descendants) {
                newRoot.descendants.push(memberId);
            }

            await newRoot.save();
            family.root = newRoot._id;
        } else if(this.descendants.length === 1) {
            family.root = this.descendants[0];
        } else {
            family.root = undefined;
        }

        await family.save();
    }

    await memberHandler.deleteMember(this._id)
}

memberSchema.methods.deleteMemberAndDescendants = async function (family) {
    const context = {
        prev: null,
        result: null
    };

    const root = await memberHandler.getOneMember(family?.root);

    if(root) {
        await root.traverse(async (member, backpack) => {
            if(member._id.equals(this._id)) {
                backpack.result = context.prev;
                return;
            } else {
                backpack.prev = member;
            }
        }, context);

        const parent = context.result;

        if(parent) {
            const index = parent.descendants.indexOf(this._id);

            if(index > -1) {
                parent.descendants.splice(index, 1);
                await parent.save();
            }
        } else {
            family.root = undefined;
            await family.save();
        }
    }

    await this.traverseReverse(async (member) => {
        await memberHandler.deleteMember(member._id);
    });
}

export const Member = mongoose.model("Member", memberSchema);