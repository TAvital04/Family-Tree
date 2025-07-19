import {Family} from "../models/familyModel.js";

// Create
    const createFamily = async (familyData) => {
        return await Family.create(familyData);
    }

// Read
    const getOneFamily = async (target) => {
        if(typeof target === String) {
            return await Family.findOne({slug: target});
        } else {
            return await Family.findOne({_id: target});
        }
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

    getOneFamily,

    updateFamily,

    deleteFamily
}