import {Tree} from "../models/treeModel.js";

const getAllTrees = async (id) => {
    return await Tree.find({user: id}).lean();
}

export default {
    getAllTrees
}