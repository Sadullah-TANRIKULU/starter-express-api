const express = require("express");
const app = express();
// const AWS = require("aws-sdk");
// const s3 = new AWS.S3();
const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("splendid-rose-snapperCyclicDB"); // find it on the Database/Storage tab
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get('/animals', async (req, res) => {
    let animals = db.collection("animals");

    // create an item in collection with key "leo"
    let leo = await animals.set("leo", {
      type: "cat",
      color: "orange"
    });
  
    // get an item at key "leo" from collection animals
    let item = await animals.get("leo");
    console.log(item);
    res.send(item);
});

app.get('/users', async (req, res) => {
    let users = db.collection("users");
  
    await users.item("mike").fragment("work").set({
      company: "cyclic"
    });
  
    let mikes_work = await users.item("mike").fragment("work").get();
    console.log(mikes_work);
    res.send(mikes_work);
});

// // curl -i https://splendid-rose-snapper.cyclic.app/myFile.txt
// app.get('*', async (req,res) => {
//   let filename = req.path.slice(1)

//   try {
//     let s3File = await s3.getObject({
//       Bucket: process.env.BUCKET,
//       Key: filename,
//     }).promise()

//     res.set('Content-type', s3File.ContentType)
//     res.send(s3File.Body.toString()).end()
//   } catch (error) {
//     if (error.code === 'NoSuchKey') {
//       console.log(`No such key ${filename}`)
//       res.sendStatus(404).end()
//     } else {
//       console.log(error)
//       res.sendStatus(500).end()
//     }
//   }
// })

// // curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://splendid-rose-snapper.cyclic.app/myFile.txt
// app.put('*', async (req,res) => {
//   let filename = req.path.slice(1)

//   console.log(typeof req.body)

//   await s3.putObject({
//     Body: JSON.stringify(req.body),
//     Bucket: process.env.BUCKET,
//     Key: filename,
//   }).promise()

//   res.set('Content-type', 'text/plain')
//   res.send('ok').end()
// })

// // curl -i -XDELETE https://splendid-rose-snapper.cyclic.app/myFile.txt
// app.delete('*', async (req,res) => {
//   let filename = req.path.slice(1)

//   await s3.deleteObject({
//     Bucket: process.env.BUCKET,
//     Key: filename,
//   }).promise()

//   res.set('Content-type', 'text/plain')
//   res.send('ok').end()
// })

// // /////////////////////////////////////////////////////////////////////////////
// // Catch all handler for all other request.
// app.use('*', (req,res) => {
//   res.sendStatus(404).end()
// })

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
