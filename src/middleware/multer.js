const multer = require('multer')

// multer function that validate file size and type
const upload = multer({
    limits:{
        // 1 MB
        fileSize:1000000
    },
    fileFilter(req,file,cb) {
        if (! file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Uploaded file is not an image.'))
        }
        cb(undefined,true)
    }
})

module.exports = upload