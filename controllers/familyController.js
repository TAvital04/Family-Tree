import familyHandler from "../handlers/familyHandler.js";
import familyRenderer from "../renderers/familyRenderer.js";
import memberHandler from "../handlers/memberHandler.js";

// Create
    const addMemberAtRoot = async (req, res) => {
        familyRenderer.addMemberAtRoot(req, res);
    }
    const createMemberAtRoot = async (req, res) => {
        const memberData = {
            member: {
                ...req.body,
            },
            user: req.user._id
        };

        const newRoot = await memberHandler.createMember(memberData);
        const family = await familyHandler.getOneFamily(req.params.familyTarget);

        await family.insertRoot(newRoot);

        familyRenderer.createMemberAtRoot(req, res);
    }

// Read
    const getFamily = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);
        const members = await family.getMembers();

        familyRenderer.getFamily(req, res, family, members);
    }

// Update
    const editFamily = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);

        familyRenderer.editFamily(req, res, family);
    }
    const updateFamily = async (req, res) => {
        const familyData = req.body;
        const family = await familyHandler.getOneFamily(req.params.familyTarget);

        await familyHandler.updateFamily(family, familyData);

        familyRenderer.updateFamily(req, res);
    }

// Delete
    const deleteFamily = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);

        await family.deleteFamily();

        familyRenderer.deleteFamily(res);
    }

export default {
    addMemberAtRoot,
    createMemberAtRoot,

    getFamily,

    editFamily,
    updateFamily,

    deleteFamily
}