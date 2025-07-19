const insertRoot = async (family, newRoot) => {
    const prevRoot = family.root;

    if(prevRoot) newRoot.insertDescendant(prevRoot._id);

    family.root = newRoot._id;
    
    await family.save();
}

const getDescendants = async (member, result) => {
    result.push(member._id)

    console.log(result)
    
    // Traversal
    member.descendants.forEach((descendant) => {
        getDescendants(descendant, result);
    });

    console.log(result);
    return result;
}

const insertDescendant = (family, descendant) => {
    family.descendants.push(descendant._id);

    family.save();
}

const find = (id, found) => {
    if(found) return found;

    if(this.id_ === id) {
        found = this._id;
        return found;
    }

    node.descendants.forEach((descendant) => {
        if(found) return found;

        descendant.find(id, found);
    });

    return found;
}

export default {
    insertRoot,
    insertDescendant,
    find
}