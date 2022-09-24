const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("/api", (req, res)=>{
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.status(200).send({data: "hello from pixidesk"});
});


exports.app = functions.https.onRequest(app);
