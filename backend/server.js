const express = require("express");
const cors = require("cors");
const app = express();
const loginRouter = require("./routers/loginRouter");
const getTimelinesRouter = require("./routers/getTimelinesRouter");
const uploadPictureRouter = require("./routers/uploadPictureRouter");

const PORT = 3000;
const host = "localhost";

app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));
app.use(express.json());
app.use(cors());

app.use("/login", loginRouter);
app.use("/getTimelines", getTimelinesRouter);
app.use("/uploadPicture", uploadPictureRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});
