const express = require("express");
const cors = require("cors");
const app = express();
const loginRouter = require("./routers/loginRouter");
const timelinesRouter = require("./routers/timelinesRouter");
const picturesRouter = require("./routers/picturesRouter");

const PORT = 3000;
const host = "localhost";

app.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/login", loginRouter);
app.use("/timelines", timelinesRouter);
app.use("/pictures", picturesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});
