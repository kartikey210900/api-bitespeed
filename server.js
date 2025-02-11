const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const sequelize = require("./db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/identify", contactRoutes);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Server is running successfully! 🚀");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully!");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to database:", err);
    process.exit(1);
  });

app.use((err, req, res, next) => {
  console.error("❌ Internal Server Error:", err);
  res
    .status(500)
    .json({ error: "Internal server error", details: err.message });
});
