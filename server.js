const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//sets defualt port
const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static("public"));

// required routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes.js")(app);
//required for deployment on heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
//launches host
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

