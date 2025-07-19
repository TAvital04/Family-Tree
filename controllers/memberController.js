import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create

// Read
    const getMember = async (req, res) =>
    /*
        - Render a page that shows Member attributes
    */
    {
        // Get the Family object that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Find the Member the request is looking for
            const member = await family.findOne({slug: req.params.memberTarget});

        // Render the request
            memberRenderer.getMember(req, res, member);
    }

// Update
    const editMember = async (req, res) =>
    /*
        - Render a form to edit a Member object
    */
    {
        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Find the Member the request is looking for
            const member = await family.findOne({id: req.params.memberTarget});
        
        // Render the request
            memberRenderer.editMember(req, res, member);
    }
    const updateMember = async (req, res) =>
    /*
        - Get data to update a Member
    */
    {
        
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

        // Find the Member that the request is looking for
            const member = await family.findOne({id: req.params.memberTarget});

        // Delete the member
            if(member) member.deleteMemberAndDescendants();

        // Render the request
            memberRenderer.deleteMember(res, family.slug);
    }

export default {
    getMember,

    editMember,
    updateMember,

    deleteMemberAndDescendants
}