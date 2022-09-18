import express, { json } from "express";
import fileUpload from "express-fileupload";
import { uploadFile, getFiles, getFile, downloadFile } from "./s3.js";

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

app.get("/files/:fileName", async (req, res) => {
  const result = await getFile(req.params.fileName);
  res.send(result.$metadata);
});

app.get("/downloadfile/:fileName", async (req, res) => {
  await downloadFile(req.params.fileName);
  res.json({ message: "file downloaded" });
});

app.post("/files", async (req, res) => {
  const result = await uploadFile(req.files.file);
  res.send(result);
});

app.use(express.static("images"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
