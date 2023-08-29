
  const express = require('express')
  var cors = require('cors')
  const app = express()
  const multer = require("multer");
  const port = 9040
  var bodyParser = require('body-parser')
  app.use(cors())
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
  var upload = multer({ storage: storage , 
    limits: {
    fileSize: 1024 * 1024 * 1024
  }, })


  app.get('/', (req, res) => {
      res.send('Hello World!')
    })

  app.post('/image', upload.single('file'), function (req, res, next) {
    try {
      console.log(req.file,"req.file")
      const imageURL =`https://multer-check-prod-nes-image-dlfuiy.mo1.mogenius.io/${req.file.path}`
      console.log(imageURL,'imageURL');
    return res.json({
        massage:"image uploadeed",
        path:imageURL
    }) 
    } catch (error) {
      console.log(error,'error');
    }
      
    })
    
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })