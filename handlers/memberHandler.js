import {Member} from "../models/memberModel.js";
import mongoose from "mongoose";

// Create
    const createMember = async (memberData) => {
        return await Member.create(memberData);
    }

// Read
    const getOneMember = async (target) => {
        if(target instanceof mongoose.Types.ObjectId) {
            return await Member.findOne({_id: target});
        } else {
            return await Member.findOne({slug: target});
        }
    }

// Update
    const updateMember = async(id, memberData) => {
        return await Member.findOneAndUpdate({_id: id}, memberData, {
            new: true,
            runValidators: true
        }).lean();
    }

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