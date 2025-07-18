// Create
    const addFamily = (res) => {
        res.render("families/familyForm", {
            title: "Add Family",
            action: "/families/add",
            family: ""
        });
    }
    const createFamily = (res) => {
        res.redirect("/families");
    }

// Read
    const getFamilies = (res, families) => {
        res.render("families/allFamilies", {
            title: "Families",
            families,
        });
    }

    const getFamily = (res, family) => {
        const members = [];
        
        if(family.root) {
            members = family.root.getDescendants(members);
        }
            
        members.forEach((member) => console.log(member.member.firstname));

        res.render("families/viewFamily", {
            title: family.title,
            family,
            members
        });
    }

// Update
    const editFamily = (req, res, family) => {
        res.render("families/familyForm", {
            title: "Edit Family",
            action: `/families/${req.params.slug}/edit`,
            family
        });
    }
    const updateFamily = (req, res) => {
        res.redirect(`/families/${req.params.slug}`);
    }

// Delete
    const deleteFamily = (res) => {
        res.redirect("/families");
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