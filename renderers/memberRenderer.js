// Create


// Read
    const getMemberBySlug = (res, member) => {
        res.render("families/viewMember", {
            title: `${member.firstname} ${member.lastname}`,
            member
        });
    }

// Update
    const editMember = (req, res, member) => {
        res.render("/families/memberForm", {
            title: "Edit Member",
            action: `/families/${req.params.familySlug}/${req.params.memberSlug}/edit`,
            member
        });
    }
    const updateMember = (req, res) => {
        const memberFamily = req.body.familyId;

        res.redirect(`/families/:${memberFamily}/:${req.params.id}`);
    }

// Delete
    const deleteMember = (req, res) => {
        const memberFamily = req.body.familyId;
        res.redirect(`/families/:${memberFamily}`);
    }

export default {
    getMemberBySlug,

    editMember,
    updateMember,

    deleteMember
}