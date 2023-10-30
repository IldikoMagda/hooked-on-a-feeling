const express = require("express");
const cors = require("cors");
const logger = require('morgan')

const postRouter = require("./routers/post")
const userRouter = require("./routers/user")
const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'))

app.get("/", (req, res) => {
  res.json({
        title: "Crammer Education",
        description: "The project is designed to encapsulate everything that has been covered so far on the course."
    })
});

app.use("/posts", postRouter)
app.use("/users", userRouter)


module.exports = app;