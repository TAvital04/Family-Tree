import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create


// Read
    const getMemberBySlug = async (req, res, next) => {
        const member = await memberHandler.getOneMember(req.params.memberTarget);
        
        if(!member) return next();

        memberRenderer.getMemberBySlug(req, res, member);
    }

// Update


// Delete
    const deleteMember = async (req, res) => {
        const family = await familyHandler.getOneFamily(req.params.familyTarget);

        await family.deleteMember({id: req.params.memberTarget});

        memberRenderer.deleteMember(res, family.slug);
    }

export default {
    getMemberBySlug,
    
    deleteMember
}