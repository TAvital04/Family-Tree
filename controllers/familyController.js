import familyHandler from "../handlers/familyHandler.js";

// Create
    const addFamily = async (req, res) => {
        res.render("families/familyForm", {
            title: "Add Family",
            action: "/families/add",
            family: ""
        });
    }
    const createFamily = async (req, res) => {
        const familyData = {
            ...req.body,
            user: req.user._id
        }
        const family = await familyHandler.createFamily(familyData);

        res.redirect("/families");
    }

// Read
    const getFamilies = async (req, res) => {
        const families = await familyHandler.getAllFamilies(req.user._id);

        res.render("families/allFamilies", {
            title: "Families",
            families
        });
    }

    const getFamilyBySlug = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.slug});

        if(!family) return next();

        res.render("families/viewFamily", {
            title: family.title,
            family
        });
    }

// Update
    const editFamilyBySlug = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.slug});

        if(!family) return next();

        res.render("families/familyForm", {
            title: "Edit Family",
            action: `/families/${req.params.slug}/edit`,
            family
        });
    }
    const updateFamily = async (req, res, next) => {
        const id = req.body._id;
        const familyData = req.body;

        const family = await familyHandler.updateFamily(id, familyData);

        res.redirect(`/families/${req.params.slug}`);
    }

// Delete
    const deleteFamily = async (req, res) => {
        const id = req.params.id;
        const family = await familyHandler.deleteFamily(id);

        res.redirect("/families");
    }

export default {
    addFamily,
    createFamily,

    getFamilies,
    getFamilyBySlug,

    editFamilyBySlug,
    updateFamily,

    deleteFamily
}