import familyRenderer from "../renderers/familyRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create
    const addFamily = async (req, res) => {
        familyRenderer.addFamily(res);
    }
    const createFamily = async (req, res) => {
        const familyData = {
            ...req.body,
            user: req.user._id
        }
        const family = await familyHandler.createFamily(familyData);

        familyRenderer.createFamily(res);
    }

// Read
    const getFamilies = async (req, res) => {
        const families = await familyHandler.getAllFamilies(req.user._id);

        familyRenderer.getFamilies(res, families);
    }

export default {
    addFamily,
    createFamily,

    getFamilies
}