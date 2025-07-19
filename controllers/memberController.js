import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create


// Read
    const getMemberBySlug = async (req, res, next) => {
        const member = await memberHandler.getOneMemberBySlug(req.params.memberSlug);
        
        if(!member) return next();

        memberRenderer.getMemberBySlug(req, res, member);
    }

// Update


// Delete
    const deleteMember = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyById(req.params.familySlug);
        const member = await memberHandler.getOneMemberById(req.params.memberSlug);

        family.deleteMemberAndDescendants(member);

        memberRenderer.deleteMember(res, family.slug);
    }

export default {
    getMemberBySlug,
    
    deleteMember
}