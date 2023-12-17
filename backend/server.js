const express = require("express");
const cors = require("cors");
const app = express();
const validateLoginRouter = require('./routers/validateLoginRouter')
const getTimelinesRouter = require('./routers/getTimelinesRouter')

const PORT = 3000;
const host = "localhost";

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/validateLogin", validateLoginRouter);
app.use('/getTimelines', getTimelinesRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});
