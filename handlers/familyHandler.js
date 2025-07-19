import {Family} from "../models/familyModel.js";
import mongoose from "mongoose";

// Create
    const createFamily = async (familyData) => {
        return await Family.create(familyData);
    }

// Read
    const getAllFamilies = async (userId) => {
        return await Family.find({user: userId}).lean();
    }

    const getOneFamily = async (target) => {
        if (mongoose.Types.ObjectId.isValid(target)) {
            if (typeof target !== "string" || target.length === 24) {
                return await Family.findOne({_id: target});
            }
        }

        return await Family.findOne({slug: target});
    };

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
    getOneFamily,

    updateFamily,

    deleteFamily
}