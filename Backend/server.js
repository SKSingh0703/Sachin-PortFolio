// const express = require('express');
// const app = express();
// require("dotenv").config();
// const dbconfig = require("./config/dbconfig"); // Corrected spelling

// const portfolioRoute = require("./routes/portfolioRoute"); // Corrected spelling

// app.use(express.json());

// app.use("/api/portfolio", portfolioRoute);

// const port = process.env.PORT || 10000  ;
// app.listen(port, () => {
//     console.log(`Server Listening on ${port}`);
// });
const express = require('express');
const app = express();
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});

