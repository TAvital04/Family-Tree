import {Family} from "../models/familyModel.js";

const getAllFamilies = async (id) => {
    return await Family.find({user: id}).lean();
}

export default {
    getAllFamilies
}