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
    const deleteMemberAndDescendants = async (req, res) => 
    /*
        - Find a Member from the Family that the request is pointing to

        - Delete the Member and all of its descendants
    */
    {
        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Find and delete the member that the request is looking for
            await family.deleteMemberAndDescendants({id: req.params.memberTarget});

        // Render the request
            memberRenderer.deleteMember(res, family.slug);
    }

export default {
    editMember,

    deleteMemberAndDescendants
}