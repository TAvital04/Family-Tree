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

    const addMemberAtRoot = (req, res) => {
        res.render("families/memberForm", {
            title: "Add Member",
            action: `/families/${req.params.familyTarget}/addToRoot`,
            member: {
                firstname: "",
                lastname: "",
                gender: "",
                birthday: ""
            }
        });
    }
    const createMemberAtRoot = (req, res) => {
        res.redirect(`/families/${req.params.familyTarget}`);
    }

// Read
    const getFamilies = (res, families) => {
        res.render("families/allFamilies", {
            title: "Families",
            families,
        });
    }

    const getFamily = (req, res, family, members) => {
        res.render("families/viewFamily", {
            req,
            title: family.title,
            family,
            members
        });
    }

    const getQuery = (req, res) => {
        res.render("families/memberForm", {
            title: "Query Member",
            action: `/families/${req.params.familyTarget}/query`,
            member: {
                firstname: "",
                lastname: "",
                gender: "",
                birthday: "" 
            }
        });
    }
    const postQuery = (req, res, family, members) => {
        res.render(
            "families/query", {
                req,
                title: "Query Member",
                family,
                members
            }
        );
    }

// Update
    const editFamily = (req, res, family) => {
        res.render("families/familyForm", {
            title: "Edit Family",
            action: `/families/${req.params.familyTarget}/edit`,
            family
        });
    }
    const updateFamily = (req, res) => {
        res.redirect(`/families`);
    }

// Delete
    const deleteFamily = (res) => {
        res.redirect("/families");
    }

export default {
    addFamily,
    createFamily,
    addMemberAtRoot,
    createMemberAtRoot,

    getFamilies,
    getFamily,
    getQuery,
    postQuery,

    editFamily,
    updateFamily,

    deleteFamily
}