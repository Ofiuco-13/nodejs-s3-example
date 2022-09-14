import express from "express";
import fileUpload from "express-fileupload";
import { uploadFile, getFiles } from "./s3.js";

const app = express();
const port = 3000;

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.get("/files", async (req, res) => {
  const result = await getFiles();
  res.json(result.Contents);
});

app.post("/files", async (req, res) => {
  const result = await uploadFile(req.files.file);
  res.send(result);
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
