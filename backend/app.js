require("dotenv").config(); // keep this at top, other wise this can create inconsistency in environment variables;
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const CONFIG = require("./config");
const app = express();
mongoose.connect(CONFIG.DB_URL);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(cors({ origin: CONFIG.ORIGIN }));
app.use("/api", routes);

app.listen(CONFIG.PORT, () => {
	console.log(`Express Server running on port ${CONFIG.PORT}`);
});

