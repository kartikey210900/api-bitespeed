require("dotenv").config();
const { Sequelize } = require("sequelize");

if (!process.env.DB_URL) {
  console.error("❌ ERROR: DB_URL is not defined in .env file");
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
