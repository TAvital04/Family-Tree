// Create


// Read
    const getMemberBySlug = (req, res, member) => {
        res.render("families/viewMember", {
            req,
            title: `${member.member.firstname} ${member.member.lastname}`,
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
    const deleteMember = (res, familySlug) => {
        res.redirect(`/families/${familySlug}`);
    }

export default {
    getMemberBySlug,

    editMember,
    updateMember,

    deleteMember
}