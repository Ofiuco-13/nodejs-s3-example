import express from "express";
import fileUpload from "express-fileupload";
import { uploadFile } from "./s3.js";

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

app.post("/files", async (req, res) => {
  const result = await uploadFile(req.files.file);
  res.send(result);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
