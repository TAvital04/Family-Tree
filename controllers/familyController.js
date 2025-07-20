import familyHandler from "../handlers/familyHandler.js";
import familyRenderer from "../renderers/familyRenderer.js";
import memberHandler from "../handlers/memberHandler.js";

// Create
    const addMemberAtRoot = async (req, res) => 
    /*
        Render a form that creates a new family member
    */
    {
        familyRenderer.addMemberAtRoot(req, res);
    }
    const createMemberAtRoot = async (req, res) => 
    /*
        - Get data for a new Member from a post request
        - This Member will occupy the root node of the Family object
    */
    {
        // Get the data from the request
            const memberData = {
                member: {
                    ...req.body,
                },
                user: req.user._id
            };

        // Create a new Member from the provided data
            const newRoot = await memberHandler.createMember(memberData);
        
        // Get the Family object that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Add the new Member as a new root of the Family object
            await family.insertRoot(newRoot);

        // Render the request
            familyRenderer.createMemberAtRoot(req, res);
    }

// Read
    const getFamily = async (req, res) =>
    /*
        - Render all the Members of a Family
    */
    {
        // Get the Family object that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Get pointers to all of the Members in the Family
            const members = await family.getMembers();

        // Render the request
            familyRenderer.getFamily(req, res, family, members);
    }

// Update
    const editFamily = async (req, res) => 
    /*
        - Render a form to edit a Family object
    */
    {
        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Render the request
            familyRenderer.editFamily(req, res, family);
    }
    const updateFamily = async (req, res) => 
    /*
        - Get data to update a Family
    */
    {
        // Get the data from the request
            const familyData = req.body;

        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Update the Family contents
            await familyHandler.updateFamily(family, familyData);

        // Render the request
            familyRenderer.updateFamily(req, res);
    }

// Delete
    const deleteFamily = async (req, res) => 
    /*
        - Delete the Family, and every Member that it's pointing to, that
            the request is pointing to
    */
    {
        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Traverse the Family and delete every Member that it points to
            await family.deleteFamily();

        // Render the request
            familyRenderer.deleteFamily(res);
    }

export default {
    addMemberAtRoot,
    createMemberAtRoot,

    getFamily,

    editFamily,
    updateFamily,

    deleteFamily
}