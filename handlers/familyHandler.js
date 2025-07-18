import {Family} from "../models/familyModel.js";

// Create
    const createFamily = async (familyData) => {
        return await Family.create(familyData);
    }

// Read
    const getAllFamilies = async (id) => {
        return await Family.find({user: id}).lean();
    }

    const getOneFamilyBySlug = async ({slug}) => {
        return await Family.findOne({slug});
    }

// Update
    const updateFamily = async (id, familyData) => {
        return await Family.findOneAndUpdate({_id: id}, familyData, {
            new: true,
            runValidators: true
        }).lean();
    }

// Delete 
    const deleteFamily = async (id) => {
        return await Family.findByIdAndDelete(id).lean();
    }

export default {
    createFamily,

    getAllFamilies,
    getOneFamilyBySlug,

    updateFamily,

    deleteFamily
}