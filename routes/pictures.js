var express = require('express')
    , router = express.Router()
    , multer = require('multer')
    , uniqid = require('uniqid');

var storage = multer.diskStorage(
    {
        destination: './files/',
        filename: function (req, file, cb) {
            console.log(file, __filename);
            var ext = file.originalname.toString().split('.')[1];
            cb(null, uniqid('pic-') + '.' + ext)
        },
    }
);

var upload = multer( { storage: storage } );

var uploading = upload.fields([{ name: 'news', maxCount: 10 }]);


router.post('/upload', uploading, function(req, res) {
    console.log(req);
    res.add({'Access-Control-Allow-Origin': '*'});
    res.send(JSON.stringify({
        name: req.files.news[0].filename
    }));
});

module.exports = router;