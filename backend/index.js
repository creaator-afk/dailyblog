require("dotenv").config(); // keep this at top, other wise this can create inconsistency in environment variables;
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const CONFIG = require("./config");
const index = express();
mongoose.connect(CONFIG.DB_URL);

index.use(bodyParser.json({ limit: "10mb" }));
index.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
index.use(helmet());
index.use(cors({ origin: CONFIG.ORIGIN }));
index.use("/api", routes);

index.listen(CONFIG.PORT, () => {
	console.log(`Express Server running on port ${CONFIG.PORT}`);
});

