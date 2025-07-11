import treeHandler from "../handlers/treeHandler.js";

const getTrees = async (req, res) => {
    const trees = await treeHandler.getAllTrees(req.user._id);

    res.send({
        ...trees
    });
}

export default {
    getTrees
}