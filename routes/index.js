const router = require("express").Router()

router.get("/", (req, res) => {
    res.status(200).send("Hello, World")
})
router.use("/users", require("./user.js"))

module.exports = router