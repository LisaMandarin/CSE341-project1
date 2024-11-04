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

module.exports = {
    getAll,
    getSingle
}