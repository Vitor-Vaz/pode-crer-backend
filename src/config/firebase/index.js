const admin = require('firebase-admin');
const loadKeys = require('./loadKeys');

linkStorage = "pode-crer-9a547.appspot.com/",

  admin.initializeApp({
    credential: admin.credential.cert(loadKeys())
  });

const bucket = admin.storage().bucket(linkStorage);



module.exports = {

  uploadImage(req, res, next) {

    if (!req.file) return next();

    const imagem = req.file;
    const nomeArquivo = Date.now() + "-" + imagem.originalname;

    const file = bucket.file(nomeArquivo);

    const stream = file.createWriteStream({
      metadata: {
        contentType: imagem.mimetype,
      },
    })


    stream.on("error", (err) => {
      console.log(err);
    })

    stream.on("finish", async () => {

      await file.makePublic();
       

      req.file.firebaseUrl = await file.publicUrl() //`https://storage.googleapis.com/${linkStorage}/${nomeArquivo}`

      next();
    })

    stream.end(imagem.buffer)

  }

}




