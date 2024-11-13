const router = require("express").Router()
const swaggerRoute = require("./swagger.js")
const usersRoute = require("./user.js")

router.get("/", (req, res) => {
    let docData = {
        GitHubRepository: "https://github.com/LisaMandarin/CSE341-project1",
        apiDocs: "https://cse341-project1-95ra.onrender.com/api-docs"
    };
    res.send(docData)
})
router.use("/api-docs", swaggerRoute)
router.use("/users", usersRoute)

module.exports = router