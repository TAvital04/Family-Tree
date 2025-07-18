import memberHandler from "../handlers/memberHandler.js";
import familyHandler from "../handlers/familyHandler.js";

// Create
    const addMemberToRoot = async (req, res) => {
        res.render("families/memberForm", {
            title: "Add Member",
            action: `/families/${req.params.familySlug}/add`,
            member: {
                firstname: "",
                lastname: "",
                gender: "",
                birthday: ""
            }
        });
    }
    const createMemberToRoot = async (req, res) => {
        const memberData = {
            ...req.body,
            user: req.user._id
        };
        const member = await memberHandler.createMember(memberData);
        
        const slug = req.params.familySlug;

        const family = await familyHandler.getOneFamilyBySlug({slug});
        family.root = member._id;

        res.redirect(`/families/${slug}`);
    }

// Read
    const getMemberBySlug = async (req, res, next) => {
        const member = await memberHandler.getOneMemberBySlug({slug: req.params.slug});

        if(!member) return next();

        res.render("families/viewMember", {
            title: `${member.firstname} ${member.lastname}`,
            member
        });
    }

// Update
    const editMember = async (req, res) => {
        const member = await memberHandler.getOneMember({id: req.params.id});

        res.render("/families/memberForm", {
            title: "Edit Member",
            action: `/families/${req.params.familySlug}/${req.params.memberSlug}/edit`,
            member
        });
    }
    const updateMember = async (req, res) => {
        const id = req.params.id;
        const memberData = req.body;

        const member = await memberHandler.updateMember(id, memberData);

        const memberFamily = req.body.familyId;
        res.redirect(`/families/:${memberFamily}/:${id}`);
    }

// Delete
    const deleteMember = async (req, res) => {
        const id = req.params.id;
        const member = await memberHandler.deleteMember(id);

        const memberFamily = req.body.familyId;
        res.redirect(`/families/:${memberFamily}`);
    }



export default {
    addMemberToRoot,
    createMemberToRoot,

    getMemberBySlug,

    editMember,
    updateMember,

    deleteMember
}