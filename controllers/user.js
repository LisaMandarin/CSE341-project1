const mongodb = require("../database/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async(req, res) => {
    try {
        const result = await mongodb.getDb().db("cse341_project1").collection("users").find()
        const users = await result.toArray()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(users)

    } catch (error) {
        console.error("Failed to get all users from mongodb: ", error.message)
        res.status(500).json({error: "Databases connection failed"})
    }
}

const getSingle = async(req, res) => {
    try {
        const userId = new ObjectId(req.params.id)

        const result = await mongodb.getDb().db("cse341_project1").collection("users").findOne({_id : userId})
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(result)

    } catch (error) {
        console.error(`Failed to get the user from mongodb: ${error.message}`)
        res.status(500).json({error: "Databases connection failed"})
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
        const userId = new ObjectId(req.params.userId)
        console.log("userId", userId)
        if (!userId) {
            return res.status(404).json({message: "Can't find the user ID"})
        }

        const { firstName, lastName, email, favoriteColor, birthday } = req.body
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({message: "All fields are required"})
        }

        const user = { firstName, lastName, email, favoriteColor, birthday }
        const result = await mongodb.getDb().db("cse341_project1").collection("users").replaceOne({_id: userId}, user)
        if (result.modifiedCount) {
            return res.status(204).json({message: `${userId} has been updated`})
        } else {
            return res.status(500).json({message: `Unable to update ${userId}`})
        }

    } catch (error) {
        console.error("Failed to update the user: ", error.message)
        res.status(500).json({message: error.message || "Error occurred while updating the user"})
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
}