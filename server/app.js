const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose
  .connect(`mongodb://localhost:27017/user-management`, {
    useNewUrlParser: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
