const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(require("./router/routes"));
dotenv.config();

require("./DB/conn");

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
