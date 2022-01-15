require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.REACT_APP_SERVICE_PORT || 5200;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // for converting your req into req.body
app.use(morgan("dev")); // for route logging

app.use((req, res, next) => {
  //  console.log(req.body);
  next();
});

const RestaurentRoutes = require("./routes/restaurant");
app.use("/api/v1/restaurant", RestaurentRoutes);

app.listen(PORT, () => {
  console.log(`server is up and listening on port ${PORT}`);
});
