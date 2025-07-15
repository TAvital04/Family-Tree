import {Member} from "../models/memberModel.js";

// Create a member
    const createMember = async (memberData) => {
        return await Member.create(memberData);
    }

// Open the member attribute page
    const getOneMemberBySlug = async ({slug}) => {
        return await Member.findOne({slug}).lean();
    }

// Edit member attributes
    const getOneMember = async ({id}) => {
        return await Member.findOne({_id: id}).lean();
    }
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

    getOneMember,
    updateMember,

    deleteMember
}