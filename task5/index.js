const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route");

const app = express();
const mongoURI = "mongodb+srv://Admin:n5iURV8hAmjRRTZr@backenddb.9tz32zs.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to database!");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((err) => {
  console.error("Connection failed!", err);
});

app.use("/api/products", productRoute);

module.exports = app;
