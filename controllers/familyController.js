import familyHandler from "../handlers/familyHandler.js";
import personHandler from "../handlers/personHandler.js";

// Open a list of families
    const getFamilies = async (req, res) => {
        const families = await familyHandler.getAllFamilies(req.user._id);

        res.render("families/allFamilies", {
            title: "Families",
            families
        });
    }

// Add a new family
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

// Edit a family
    const getFamilyBySlug = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.slug});

        if(!family) return next();

        res.render("families/viewFamily", {
            title: family.title,
            family
        });
    }

    const addMember = async (req, res) => {
        res.render("families/memberForm", {
            title: "Add member",
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

// Delete a family
    const deleteFamily = async (req, res) => {
        const id = req.params.id;
        const family = await familyHandler.deleteFamily(id);

        res.redirect("/families");
    }

export default {
    getFamilies,

    addFamily,
    createFamily,

    getFamilyBySlug,
    addMember,
    createMember,

    deleteFamily
}