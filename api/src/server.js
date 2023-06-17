require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./Routes/index");

const PORT = process.env.PORT || 3333;

/* Whitelist cors ips and origins */
app.use(
  cors({ origin: [process.env.CORS_ORIGIN, process.env.CORS_ORIGIN_IP] })
);

/* handle json and x-www-form-url-encoded requestBody formats */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes.AuthRouter);
app.use("/api/v1/sevas", routes.SevaRouter);
app.use("/api/v1/events", routes.EventRouter);
app.use("/api/v1/temples", routes.TempleRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

const server = app.listen(PORT, () => {
  console.log(
    `App listening at http://${server.address().address}:${
      server.address().port
    }`
  );
});
