import {Family} from "../models/familyModel.js";
import {Member} from "../models/memberModel.js";

// Open a list of families
    const getAllFamilies = async (id) => {
        return await Family.find({user: id}).lean();
    }

// Create a family
    const createFamily = async (familyData) => {
        return await Family.create(familyData);
    }

// Edit a family
    const getOneFamilyBySlug = async ({slug}) => {
        return await Family.findOne({slug}).lean();
    }

    const createMember = async (memberData) => {
        return await Member.create(memberData);
    }

// Delete a family
    const deleteFamily = async (id) => {
        return await Family.findByIdAndDelete(id).lean();
    }

export default {
    getAllFamilies,

    createFamily,

    getOneFamilyBySlug,
    createMember,

    deleteFamily
}