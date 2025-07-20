import {Member} from "../models/memberModel.js";
import mongoose from "mongoose";

// Create
    const createMember = async (memberData) => {
        return await Member.create(memberData);
    }

// Read
    const getOneMember = async (target) => {
        if (mongoose.Types.ObjectId.isValid(target)) {
            if (typeof target !== "string" || target.length === 24) {
                return await Member.findOne({_id: target});
            }
        }

        return await Member.findOne({slug: target});
    };

// Update
    const updateMember = async (member, memberData) => {
        Object.assign(member.member, memberData);
        await member.save();
    };

// Delete
    const deleteMember = async (id) => {
        return await Member.findByIdAndDelete({_id: id}).lean();
    }

export default {
    createMember,

    getOneMember,
    
    updateMember,

    deleteMember
}