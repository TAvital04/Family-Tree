import familyHandler from "../handlers/familyHandler.js";
import familyRenderer from "../renderers/familyRenderer.js";
import memberHandler from "../handlers/memberHandler.js";

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

    const getFamily = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.slug});
        const root = await memberHandler.getOneMemberById({id: family.root._id});

        if(!family) return next();

        let members = [];
        members = root.getDescendants(members);

        console.log(members);

        familyRenderer.getFamily(res, family, members);
    }

// Update
    const editFamily = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.slug});

        if(!family) return next();

        familyRenderer.editFamily(req, res, family);
    }
    const updateFamily = async (req, res, next) => {
        const id = req.body._id;
        const familyData = req.body;

        const family = await familyHandler.updateFamily(id, familyData);

        familyRenderer.updateFamily(req, res);
    }

// Delete
    const deleteFamily = async (req, res) => {
        const id = req.params.id;
        const family = await familyHandler.deleteFamily(id);

        familyRenderer.deleteFamily(res);
    }

export default {
    addFamily,
    createFamily,

    getFamilies,
    getFamily,

    editFamily,
    updateFamily,

    deleteFamily
}