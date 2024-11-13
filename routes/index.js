const router = require("express").Router()
const swaggerRoute = require("./swagger.js")
const usersRoute = require("./user.js")

router.get("/", (req, res) => {
    let docData = {
        documentationURL: "https://github.com/LisaMandarin/CSE341-project1"
    };
    res.send(docData)
})
router.use("/api-docs", swaggerRoute)
router.use("/users", usersRoute)

module.exports = router