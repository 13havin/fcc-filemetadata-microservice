var express = require('express');
var cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', true);

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  console.log(error);
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  console.log(req.file);
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size

  const fileMetaData = { name: name, type: type, size: size}
  return res.json(fileMetaData);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
