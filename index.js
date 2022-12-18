const express = require('express')
const app = express()

const AWS = require("aws-sdk");
const s3 = new AWS.S3()

// store something
await s3.putObject({
                Body: JSON.stringify({key:"value"}),
                Bucket: "cyclic-splendid-rose-snapper-eu-north-1",
                Key: "some_files/my_file.json",
            }).promise()

// get it back
let my_file = await s3.getObject({
                Bucket: "cyclic-splendid-rose-snapper-eu-north-1",
                Key: "some_files/my_file.json",
            }).promise()

console.log(JSON.parse(my_file))

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)