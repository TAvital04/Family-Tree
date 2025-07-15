import {Person} from "../models/personModel.js";

// Create a person
    const createPerson = async (personData) => {
        return await Person.create(personData);
    }

export default {
    createPerson
}