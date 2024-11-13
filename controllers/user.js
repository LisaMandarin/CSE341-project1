const mongodb = require("../database/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async(req, res) => {
    // #swagger.description = "Get all users"
    // #swagger.tags = ['Users']
    try {
        const result = await mongodb.getDb().db("cse341_project1").collection("users").find()
        const users = await result.toArray()
        if (users.length > 0) {
            return res.status(200).json(users)
        } else {
            return res.status(200).json({message: "No users found"})
        }

    } catch (error) {
        console.error("Failed to get all users from mongodb: ", error.message)
        return res.status(500).json({error: "Databases connection failed"})
    }
}

const getSingle = async(req, res) => {
    // #swagger.description = "Get the user by ID"
    // #swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid user ID format"})
        }

        const id = new ObjectId(req.params.id)
        const result = await mongodb.getDb().db("cse341_project1").collection("users").findOne({_id : id})

        if (result) {
            // res.setHeader("Content-Type", "application/json")
            return res.status(200).json(result)
        } else {
            return res.status(404).json({message: `User ${req.params.id} not found`})
        }

    } catch (error) {
        console.error(`Failed to get the user from mongodb: ${error.message}`)
        res.status(500).json({message: error.message || "Failed to get the user"})
    }
}

const createUser = async(req, res) => {
    // #swagger.description = "Create a user data"
    // #swagger.tags = ['Users']
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body
        if ( !firstName || !lastName || !email || !favoriteColor || !birthday ) {
            return res.status(400).json({ message: "All fields are required"})
        }
        
        const user = { firstName, lastName, email, favoriteColor, birthday}
        const result = await mongodb.getDb().db("cse341_project1").collection("users").insertOne(user)
        
        if (result.acknowledged) {
            res.status(201).json({ message: `${result.insertedId} is created.`})
        } else {
            res.status(500).json({message: "Failed to create the user"})
        }

    } catch (error) {
        console.error(`Failed to create an user to mongodb: ${error.message}`)
        res.status(500).json({message: error.message || "Error occurred while creating the user"})
    }
}

const updateUser = async (req, res) => {
    // #swagger.description = "update a user by ID"
    // #swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid user ID format"})
        }

        const { firstName, lastName, email, favoriteColor, birthday } = req.body
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({message: "All fields are required"})
        }

        const user = { firstName, lastName, email, favoriteColor, birthday }
        const id = new ObjectId(req.params.id)
        const result = await mongodb.getDb().db("cse341_project1").collection("users").replaceOne({_id: id}, user)

        if (result.modifiedCount > 0) {
            return res.status(200).json({message: `User ${req.params.id} has been updated`})
        } else {
            return res.status(404).json({message: `User ${req.params.id} not found or no change mode`})
        }

    } catch (error) {
        console.error("Failed to update the user: ", error.message)
        return res.status(500).json({message: error.message || "Error occurred while updating the user"})
    }
}

const deleteUser = async (req, res) => {
    // #swagger.description = "Delete a user by ID"
    // #swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid user ID format"})
        }

        const id = new ObjectId(req.params.id)
        const result = await mongodb.getDb().db("cse341_project1").collection("users").deleteOne({_id: id})
        
        if (result.deletedCount > 0) {
            return res.status(200).json({message: `${req.params.id} has been deleted`})
        } else {
            return res.status(404).json({message: `User ${req.params.id} not found`})
        }

    } catch (error) {
        console.error("Failed to delete the user: ", error.message)
        return res.status(500).json({message: error.message || "Error occurred while deleting the user"})
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
}