import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create




// Update
    const editMember = async (req, res) =>
    /*
        - Render a form to edit a Member object
    */
    {
        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);
        
        // Render the request
    }

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