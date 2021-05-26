const multer = require('multer');


module.exports = {
    storage: multer.memoryStorage(),
    limits: 5 * 1024 * 1024,
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'image/jpg'
        ];

        if( allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('Tipo de arquivo invalido, selecione uma imagem formato jpeg, pjpeg, png ou até gif'));
        }
    }
}