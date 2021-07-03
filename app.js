const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 4000;

// default options
app.use(fileUpload());

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  if (
    req.files.sampleFile.mimetype == "application/vnd.android.package-archive"
  ) {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + "/public/" + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      res.status(200).send({ data: "fill uploaded!", errorMessage: null });
    });
  } else {
    res
      .status(400)
      .send({ data: null, errorMessage: "can only select APK file" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
