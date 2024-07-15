require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");

const appRoutes = require("./routes/appRoute");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const routes = require("./routes/routes");

const { verifyToken } = require("./utils/token");

const app = express();

// Middlewear
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes)
app.use("/app", verifyToken, appRoutes);
app.use("/post", postRoutes);
app.use("/admin", verifyToken, adminRoutes);
app.use("/user", verifyToken, userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("server started @", process.env.PORT || "http://localhost:3000");
});
