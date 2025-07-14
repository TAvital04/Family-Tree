import memberHandler from "../handlers/memberHandler";

// Open the member attribute page
    const getMemberBySlug = async (req, res, next) => {
        const member = await memberHandler.getOneMemberBySlug({slug: req.params.slug});

        if(!member) return next();

        res.send(member);
    }

// Edit member attributes
    const editMember = async (req, res) => {
        const member = await memberHandler.getOneMember({id: req.params.id});

        res.send(member);
    }
    const updateMember = async (req, res) => {
        const id = req.params.id;
        const memberData = req.body;

        const member = await memberHandler.updateMember(id, memberData);

        const memberFamily = req.body.familyId;
        res.redirect(`/families/:${memberFamily}/:${id}`);
    }

// Delete a member
    const deleteMember = async (req, res) => {
        const id = req.params.id;
        const member = await memberHandler.deleteMember(id);

        const memberFamily = req.body.familyId;
        res.redirect(`/families/:${memberFamily}`);
    }

export default {
    getMemberBySlug,

    editMember,
    updateMember,

    deleteMember
}