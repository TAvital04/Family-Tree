import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create


// Read
    const getMemberBySlug = async (req, res, next) => {
        const member = await memberHandler.getOneMemberBySlug({slug: req.params.memberSlug});
        
        if(!member) return next();

        memberRenderer.getMemberBySlug(req, res, member);
    }

// Update


// Delete
    const deleteMember = async (req, res) => {
        const id = req.params.id;
        
        await memberHandler.deleteMember({id});

        memberRenderer.deleteMember(req, res);
    }



export default {
    getMemberBySlug,
    
    deleteMember
}