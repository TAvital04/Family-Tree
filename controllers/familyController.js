import familyHandler from "../handlers/familyHandler.js";
import familyRenderer from "../renderers/familyRenderer.js";
import memberHandler from "../handlers/memberHandler.js";

// Create
    const addMemberToRoot = async (req, res) => 
    /*
        Render a form that creates a new family member
    */
    {
        familyRenderer.addMemberToRoot(req, res);
    }
    const createMemberToRoot = async (req, res) => 
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
        
        // Receive the Family object that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familySlug);

        // Add the new Member as a new root of the Family object
            await family.insertRoot(newRoot);

        // Render the request
            familyRenderer.createMemberToRoot(req, res);
    }

// Read
    const getFamily = async (req, res, next) =>
    /*
        - Render all the Members of a Family
    */
    {
        // Get the Family object that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familySlug);        

            if(!family) return next();

        // Get pointers to all of the Members in the Family
            const members = family.getMembers();

        // Render the request
            familyRenderer.getFamily(req, res, family, members);
    }

// Update
    const editFamily = async (req, res, next) => 
    /*
        - Render a form to edit a Family object
    */
    {
        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Render the request
            familyRenderer.editFamily(req, res, family);
    }
    const updateFamily = async (req, res, next) => 
    /*
        - Get data to update a Family
    */
    {
        // Get the data from the request
            const familyData = req.body;

        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Update the family contents
            await familyHandler.updateFamily(family._id, familyData);

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
        // Get the data that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Traverse the Family and delete every Member that it points to
            await family.deleteFamily();

        // Render the request
            familyRenderer.deleteFamily(res);
    }

export default {
    addMemberToRoot,
    createMemberToRoot,

    getFamily,

    editFamily,
    updateFamily,

    deleteFamily
}