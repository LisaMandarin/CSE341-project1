const router = require("express").Router()

router.use("/users", require("./user.js"))

module.exports = router