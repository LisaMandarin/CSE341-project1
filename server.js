require("dotenv").config()
const express = require("express")
const app = express()
const routes = require("./routes")
const mongodb = require("./database/database")
const port = process.env.PORT || 3000

app.use(express.json())
app.use("/", routes)
mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, console.log(`Database is connecting and listening at ${port}`))
    }
})

