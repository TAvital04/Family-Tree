import noteHandler from "../handlers/noteHandler.js";

// Create
    // Create a tree
    const addTree = async (req, res) => {
        res.send(req.body);
    }
    const createTree = async(req, res) => {
        const treeData = {
            ...req.body,
            user: req.user._id
        }

        const tree = await treeHandler.createTree(treeData);

        res.redirect("/trees")
    }