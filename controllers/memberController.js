import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create
    const addMemberToRoot = async (req, res) => {
        memberRenderer.addMemberToRoot(req, res);
    }
    const createMemberToRoot = async (req, res) => {
        const memberData = {
            ...req.body,
            user: req.user._id
        };
        const member = await memberHandler.createMember(memberData);

        const family = await familyHandler.getOneFamilyBySlug(req.params.familySlug);
        await member.insertRoot(family);

        memberRenderer.createMemberToRoot(req, res);
    }

// Read
    const getMemberBySlug = async (req, res, next) => {
        const member = await memberHandler.getOneMemberBySlug({slug: req.params.slug});

        if(!member) return next();

        memberRenderer.getMemberBySlug(res, member);
    }

// Update
    const editMember = async (req, res) => {
        const member = await memberHandler.getOneMember({id: req.params.id});

        memberRenderer.editMember(res, req, member);
    }
    const updateMember = async (req, res) => {
        const id = req.params.id;
        const memberData = req.body;

        await memberHandler.updateMember(id, memberData);

        memberRenderer.updateMember(req, res);
    }

// Delete
    const deleteMember = async (req, res) => {
        const id = req.params.id;
        
        await memberHandler.deleteMember(id);

        memberRenderer.deleteMember(req, res);
    }



export default {
    addMemberToRoot,
    createMemberToRoot,

    getMemberBySlug,

    editMember,
    updateMember,

    deleteMember
}