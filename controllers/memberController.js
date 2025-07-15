import memberHandler from "../handlers/memberHandler.js";

// Create
    const addMember = async (req, res) => {
        res.render("families/memberForm", {
            title: "Add Member",
            action: `/families/${req.params.slug}/add`,
            member: {
                firstname: "",
                lastname: "",
                gender: "",
                birthday: ""
            }
        });
    }
    const createMember = async (req, res) => {
        const personData = {...req.body};
        const person = await personHandler.createPerson(personData);

        const memberData = {person};
        const member = await memberHandler.createMember(memberData);

        res.redirect(`/families/${req.params.slug}`);
    }

// Read
    const getMemberBySlug = async (req, res, next) => {
        const member = await memberHandler.getOneMemberBySlug({slug: req.params.slug});

        if(!member) return next();

        res.render("viewMember", {
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
    addMember,
    createMember,

    getMemberBySlug,

    editMember,
    updateMember,

    deleteMember
}