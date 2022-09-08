import express from "express";
import fileUpload from "express-fileupload";
import "./config.js";

const app = express();
const port = 3000;

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.get("/", (req, res) => {
  res.send("Upload files");
});

app.post("/files", (req, res) => {
  console.log(req.files);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
