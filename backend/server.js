const express = require("express");
const cors = require("cors");
const app = express();
const loginRouter = require("./routers/loginRouter");
const getTimelinesRouter = require("./routers/getTimelinesRouter");
const uploadPictureRouter = require("./routers/uploadPictureRouter");

const PORT = 3000;
const host = "localhost";

app.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/getTimelines", getTimelinesRouter);
app.use("/uploadPicture", uploadPictureRouter);

app.post("/test", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});
