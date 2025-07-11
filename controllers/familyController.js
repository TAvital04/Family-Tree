import familyHandler from "../handlers/familyHandler.js";

// Open a list of families
    const getFamilies = async (req, res) => {
        const families = await familyHandler.getAllFamilies(req.user._id);

        res.send({
            ...families
        });
    }

// Add a new family
    const addFamily = async (req, res) => {
        res.send("Add a new family");
    }
    const createFamily = async (req, res) => {
        const familyData = {
            ...req.body,
            user: req.user._id
        }
        const family = await familyHandler.createFamily(familyData);

        res.redirect("/families");
    }

// Edit a family
    const getFamilyBySlug = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.slug});

        if(!family) return next();

        res.send(family);
    }

    const editFamily = async (req, res) => {
        const family = await familyHandler.getOneFamily({id: req.params.id});

        res.send(family);
    }
    const updateFamily = async (req, res) => {
        const id = req.params.id;
        const familyData = req.body;

        const family = await familyHandler.updateFamily(id, familyData);

        res.redirect("/families");
    }

// Delete a family
    const deleteFamily = async (req, res) => {
        const id = req.params.id;
        await familyHandler.deleteFamily(id);

        res.redirect("/families");
    }

export default {
    getFamilies,

    addFamily,
    createFamily,

    getFamilyBySlug,
    editFamily,
    updateFamily,

    deleteFamily
}