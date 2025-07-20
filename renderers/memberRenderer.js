// Create
    const addMemberAtMember = (req, res) => {
        res.render("families/memberForm", {
            title: "Add Member",
            action: `/families/${req.params.familyTarget}/${req.params.memberTarget}/addToMember`,
            member: {
                firstname: "",
                lastname: "",
                gender: "",
                birthday: ""
            }
        })
    }
    const createMemberAtMember = (req, res) => {
        res.redirect(`/families/${req.params.familyTarget}/${req.params.memberTarget}`);
    }

// Read
    const getMember = (req, res, member) => {
        res.render("families/viewMember", {
            req,
            title: `${member.member.firstname} ${member.member.lastname}`,
            member
        });
    }

// Update
    const editMember = (req, res, member) => {
        res.render("families/memberForm", {
            title: "Edit Member",
            action: `/families/${req.params.familyTarget}/${req.params.memberTarget}/edit`,
            member
        });
    }
    const updateMember = (req, res) => {
        res.redirect(`/families/${req.params.familyTarget}`);
    }

// Delete
    const deleteMember = (res, familyTarget) => {
        res.redirect(`/families/${familyTarget}`);
    }

export default {
    addMemberAtMember,
    createMemberAtMember,
    
    getMember,

    editMember,
    updateMember,

    deleteMember
}