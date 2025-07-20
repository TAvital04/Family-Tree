import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create
    const addMemberAtMember = async (req, res) => {
        memberRenderer.addMemberAtMember(req, res);
    }
    const createMemberAtMember = async (req, res) => {
        const memberData = {
            member: {
                ...req.body
            },
            user: req.user._id
        };
    
        const newMember = await memberHandler.createMember(memberData);

        const family = await familyHandler.getOneFamily(req.params.familyTarget);
        const member = await family.findMember({slug: req.params.memberTarget});

        await member.insertMember(newMember);

        memberRenderer.createMemberAtMember(req, res, member);
    }

// Read
    const getMember = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);
        const member = await family.findMember({slug: req.params.memberTarget});

        memberRenderer.getMember(req, res, family, member);
    }

// Update
    const editMember = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);
        const member = await family.findMember({id: req.params.memberTarget});
    
        memberRenderer.editMember(req, res, member);
    }
    const updateMember = async (req, res) => {
        const memberData = req.body;

        const family = await familyHandler.getOneFamily(req.params.familyTarget);
        const member = await family.findMember({id: req.params.memberTarget});

        await memberHandler.updateMember(member, memberData);

        memberRenderer.updateMember(req, res, family);
    }

// Delete
    const deleteMember = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);
        const member = await family.findMember({id: req.params.memberTarget});

        await member.deleteMember(family);

        memberRenderer.deleteMember(req, res, family);
    }

    const deleteMemberAndDescendants = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);
        const member = await family.findMember({id: req.params.memberTarget});

        if(member) await member.deleteMemberAndDescendants(family);

        memberRenderer.deleteMember(req, res, family);
    }

export default {
    addMemberAtMember,
    createMemberAtMember,

    getMember,

    editMember,
    updateMember,

    deleteMember,
    deleteMemberAndDescendants
}