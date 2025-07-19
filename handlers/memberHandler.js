import {Member} from "../models/memberModel.js";

// Create
    const createMember = async (memberData) => {
        return await Member.create(memberData);
    }

// Read
    const getOneMember = async (target) => {
        if(typeof target === String) {
            return await Family.findOne({slug: target});
        } else {
            return await Family.findOne({_id: target});
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