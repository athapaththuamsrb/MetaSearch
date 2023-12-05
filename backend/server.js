const express = require("express");
const cors = require("cors");

require("dotenv").config();
const getAllRouter = require("./Routers/getAll"); // Import the search route module
const summaryRouter = require("./Routers/summary"); // Import the search route module
const moodRouter = require("./Routers/mood"); // Import the search route module
const mappingRouter = require("./Routers/mapping"); // Import the search route module
const searchRouter = require("./Routers/search"); // Import the search route module

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/getAll", getAllRouter);
app.use("/getAll/mood", moodRouter);
app.use("/getMapping", mappingRouter);
app.use("/summary", summaryRouter);
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
