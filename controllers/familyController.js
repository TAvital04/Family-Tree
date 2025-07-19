import familyHandler from "../handlers/familyHandler.js";
import familyRenderer from "../renderers/familyRenderer.js";
import memberHandler from "../handlers/memberHandler.js";

// Create
    const addMemberToRoot = async (req, res) => {
        familyRenderer.addMemberToRoot(req, res);
    }
    const createMemberToRoot = async (req, res) => {
        const memberData = {
            member: {
                ...req.body,
            },
            user: req.user._id
        };

        const newRootId = await memberHandler.createMember(memberData);
        const newRoot = await memberHandler.getOneMemberById(newRootId);

        const family = await familyHandler.getOneFamilyBySlug(req.params.familySlug);

        await family.insertRoot(newRoot);

        familyRenderer.createMemberToRoot(req, res);
    }

// Read
    const getFamily = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.familySlug});        
        const root = await(memberHandler.getOneMemberById({id: family.root}));

        if(!family) return next();

        if(root){          
            let memberIds = [];
            let members = [];

            memberIds = await root.getDescendants(memberIds);

            let member;
            for(const memberId of memberIds) {
                member = await memberHandler.getOneMemberById({id: memberId});
                members.push(member);
            }

            familyRenderer.getFamily(req, res, family, members);
        } else {
            familyRenderer.getFamily(req, res, family, undefined);
        }
    }

// Update
    const editFamily = async (req, res, next) => {
        const family = await familyHandler.getOneFamilyBySlug({slug: req.params.slug});

        if(!family) return next();

        familyRenderer.editFamily(req, res, family);
    }
    const updateFamily = async (req, res, next) => {
        const id = req.body._id;
        const familyData = req.body;

        const family = await familyHandler.updateFamily(id, familyData);

        familyRenderer.updateFamily(req, res);
    }

// Delete
    const deleteFamily = async (req, res) => {
        const id = req.params.familySlug;
        const family = await familyHandler.deleteFamily(id);

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