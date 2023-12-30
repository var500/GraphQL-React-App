const mongoose = require("mongoose");

const db = async () => {
  console.log("Connecting to Db..");
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("✅ connected to DB successfully"))
    .catch((err) => console.log("couldn't connect to database:", err.message));
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = db;