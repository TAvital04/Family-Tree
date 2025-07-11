import familyHandler from "../handlers/familyHandler.js";

const getFamilies = async (req, res) => {
    const families = await familyHandler.getAllFamilies(req.user._id);

    res.send({
        ...families
    });
}

export default {
    getFamilies
}