const express = require("express");
const cors = require("cors");
const app = express();
const authenticationRouter = require("./routers/authenticationRouter");
const timelinesRouter = require("./routers/timelinesRouter");
const uploadRouter = require("./routers/uploadRouter");
const usersRouter = require("./routers/usersRouter");

const PORT = 3000;
const host = "localhost";

app.use(cors());
app.use(express.raw({ type: "application/octet-stream", limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/authentication", authenticationRouter);
app.use("/timelines", timelinesRouter);
app.use("/upload", uploadRouter);
app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});
