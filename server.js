const exp = require("express")
const Mongoose = require("mongoose")
const feedbackApi = require("./Api/feedBackApi")
const userApi = require("./Api/userApi")
const app = exp()
const compression = require("compression")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")

// MiddleWares
app.use(exp.json())
app.use(cors())
app.use(compression())//to compress the size of the response-inorder to boost the performance
app.use(morgan("dev"))// logger

// connect angular build with web server
// __dirname ==> returns current directory name
app.use(exp.static(path.join(__dirname, "./dist/airlinesTravel")))


const dbConnectionUrl = "mongodb://localhost:27017/airlineTravels"
// connect method in mongoose returns promise
Mongoose.connect(dbConnectionUrl)
    .then(() => console.log("DataBase Connected SuccessFully...."))
    .catch(() => console.log("Error Occured in db Connection"))

// routes
app.use("/feedback", feedbackApi)
app.use("/user", userApi)

//catch all other routes and return the index file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/airlinesTravel/index.html'))
})

const port = 5000
app.listen(port, () => console.log(`Server Listening in ${port}`))