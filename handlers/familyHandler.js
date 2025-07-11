import {Family} from "../models/familyModel.js";

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

    const getOneFamily = async ({id}) => {
        return await Family.findOne({_id: id}).lean();
    }
    const updateFamily = async (id, familyData) => {
        return await Family.findOneAndUpdate({_id: id}, familyData, {
            new: true,
            runValidators: true
        }).lean();
    }

// Delete a family
    const deleteFamily = async (id) => {
        return await Family.findByIdAndDelete(id).lean();
    }

export default {
    getAllFamilies,

    createFamily,

    getOneFamilyBySlug,
    getOneFamily,
    updateFamily,

    deleteFamily
}