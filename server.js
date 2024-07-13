
const express = require('express');
const app = express();
require("dotenv").config();
const dbconfig = require("./config/dbconfig"); // Corrected spelling

const portfolioRoute = require("./routes/portfolioRoute"); // Corrected spelling

app.use(express.json());

app.use("/api/portfolio", portfolioRoute);


// const path = require("path");

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname,"client/build")));
//     app.get("*",(req,res) => {
//         res.sendFile(path.join(__dirname,"client/build/index.html"));
//     });
// }
const port = process.env.PORT || 10000  ;
app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});
