import memberHandler from "../handlers/memberHandler.js";
import memberRenderer from "../renderers/memberRenderer.js";
import familyHandler from "../handlers/familyHandler.js";

// Create
    const addMemberAtMember = async (req, res) => 
    /*
        Render a form that creates a new Family Member
    */
    {
        memberRenderer.addMemberAtMember(req, res);
    }
    const createMemberAtMember = async (req, res) =>
    /*
        - Get data for a new Member from a post request
        - This Member will be a new descendant of another member
    */
    {
        // Get the data from the request
            const memberData = {
                member: {
                    ...req.body
                },
                user: req.user._id
            };
        
        // Create a new Member from the provided data
            const newMember = await memberHandler.createMember(memberData);
        
        // Get the Family object that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Get the Member object the request is pointing to
            const member = await family.findMember({slug: req.params.memberTarget});

        // Insert the new Member as a descendant of the requested Member
            await member.insertDescendant(newMember);

        // Render the request
            memberRenderer.createMemberAtMember(req, res, member);
    }

// Read
    const getMember = async (req, res) =>
    /*
        - Render a page that shows Member attributes
    */
    {
        // Get the Family object that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);

        // Find the Member the request is looking for
            const member = await family.findMember({slug: req.params.memberTarget});

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
            const member = await family.findMember({id: req.params.memberTarget});
        
        // Render the request
            memberRenderer.editMember(req, res, member);
    }
    const updateMember = async (req, res) =>
    /*
        - Get data to update a Member
    */
    {
        // Get the data from the request
            const memberData = req.body;

        // Get the Family that the request is pointing to
            const family = await familyHandler.getOneFamily(req.params.familyTarget);
        
        // Find the Member the request is looking for
            const member = await family.findMember({id: req.params.memberTarget});

            console.log(member)

        // Update the Member contents
            await memberHandler.updateMember(member, memberData);

            console.log(member)

        
        // Render the request
            memberRenderer.updateMember(req, res, family);
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
            const member = await family.findMember({id: req.params.memberTarget});

        // Delete the member
            if(member) await member.deleteMemberAndDescendants(family);

        // Render the request
            memberRenderer.deleteMember(req, res);
    }

export default {
    addMemberAtMember,
    createMemberAtMember,

    getMember,

    editMember,
    updateMember,

    deleteMemberAndDescendants
}