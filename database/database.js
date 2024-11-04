require("dotenv").config()
const mongoClient = require("mongodb").MongoClient

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log("Db is already initialized")
        return callback(null, _db)
    }
    const uri = process.env.MONGODB_URI
    mongoClient.connect(uri)
        .then(client => {
            _db = client
            callback(null, _db)
        })
        .catch(error => {
            callback(error)
        })
}

const getDb = () => {
    if (!_db) {
        throw Error("Db not initialized")
    }
    return _db
}

module.exports = {
    initDb,
    getDb
}