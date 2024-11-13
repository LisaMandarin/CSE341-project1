const mongodb = require("../database/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async(req, res) => {
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
    try {
        console.log("userId: ", req.params.id)
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid user ID format"})
        }

        const userId = new ObjectId(req.params.id)
        const result = await mongodb.getDb().db("cse341_project1").collection("users").findOne({_id : userId})

        if (result) {
            // res.setHeader("Content-Type", "application/json")
            return res.status(200).json(result)
        } else {
            return res.status(404).json({message: `User ${req.params.userId} not found`})
        }

    } catch (error) {
        console.error(`Failed to get the user from mongodb: ${error.message}`)
        res.status(500).json({message: error.message || "Failed to get the user"})
    }
}

const createUser = async(req, res) => {
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
    try {
        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({message: "Invalid user ID format"})
        }

        const { firstName, lastName, email, favoriteColor, birthday } = req.body
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({message: "All fields are required"})
        }

        const user = { firstName, lastName, email, favoriteColor, birthday }
        const userId = new ObjectId(req.params.userId)
        const result = await mongodb.getDb().db("cse341_project1").collection("users").replaceOne({_id: userId}, user)

        if (result.modifiedCount > 0) {
            return res.status(200).json({message: `User ${req.params.userId} has been updated`})
        } else {
            return res.status(404).json({message: `User ${req.params.userId} not found or no change mode`})
        }

    } catch (error) {
        console.error("Failed to update the user: ", error.message)
        return res.status(500).json({message: error.message || "Error occurred while updating the user"})
    }
}

const deleteUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({message: "Invalid user ID format"})
        }

        const userId = new ObjectId(req.params.userId)
        const result = await mongodb.getDb().db("cse341_project1").collection("users").deleteOne({_id: userId})
        
        if (result.deletedCount > 0) {
            return res.status(200).json({message: `${req.params.userId} has been deleted`})
        } else {
            return res.status(404).json({message: `User ${req.params.userId} not found`})
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