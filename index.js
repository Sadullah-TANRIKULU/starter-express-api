const express = require("express");
const app = express();
// const AWS = require("aws-sdk");
// const s3 = new AWS.S3();
const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("splendid-rose-snapperCyclicDB"); // find it on the Database/Storage tab
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// create or update
app.post("/:col/:key", async (req, res) => {
  console.log(req.body);

  const col = req.params.col;
  const key = req.params.key;
  
  const item = await db.collection(col).set(key, req.body);
  console.log(item);
  res.json(item).end();
});
// get full list
app.get("/:col", async (req, res) => {
  const col = req.params.col;
  
  const item = await db.collection(col).list();
  console.log(item);
  res.json(item).end();
});
// get one
app.get("/:col/:key", async (req, res) => {
  const col = req.params.col;
  const key = req.params.key;

  const item = await db.collection(col).get(key);
  res.json(item).end();
})
// delete
app.delete('/:col/:key', async (req, res) => {
  const col = req.params.col;
  const key = req.params.key;

  const item = await db.collection(col).delete(key);
  res.json(item).end();
})

// /////////////////////////////////////////////////////////////////////////////
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`index.js listening at http://localhost:${port}`);
});

// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
