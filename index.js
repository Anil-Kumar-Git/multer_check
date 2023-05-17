
const express = require('express')
const app = express()
const multer = require("multer");
const port = 3001
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/image', upload.single('img'), function (req, res, next) {

    const imageURL =`https://multer-check-prod-nes-image-dlfuiy.mo1.mogenius.io/${req.file.path}`
       console.log(imageURL,'imageURL');
    return res.json({
        massage:"image uploadeed ",
        path:imageURL
    })
    
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})