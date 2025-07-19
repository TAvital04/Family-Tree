import {Member} from "../models/memberModel.js";

// Create
    const createMember = async (memberData) => {
        return await Member.create(memberData);
    }

// Read
    const getOneMemberBySlug = async ({slug}) => {
        return await Member.findOne({slug});
    }
    const getOneMemberById = async ({id}) => {
        return await Member.findOne({_id: id});
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
        return await Member.findByIdAndDelete(id).lean();
    }

export default {
    createMember,

    getOneMemberBySlug,
    getOneMemberById,
    
    updateMember,

    deleteMember
}