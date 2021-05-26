const admin = require('firebase-admin');

const linkStorage = process.env.FIREBASE_BUCKET_URL;

const bucket = admin.storage().bucket(linkStorage);

module.exports = {
  // eslint-disable-next-line consistent-return
  uploadImage(req, res, next) {
    if (!req.file) return next();

    const imagem = req.file;
    const nomeArquivo = `${Date.now()}-${req.params.id}-${imagem.originalname}`;

    const file = bucket.file(nomeArquivo);

    const stream = file.createWriteStream({
      metadata: {
        contentType: imagem.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.log(err);
    });

    stream.on('finish', async () => {
      await file.makePublic();

      req.file.firebaseUrl = `https://storage.googleapis.com/${linkStorage}/${nomeArquivo}`;

      next();
    });

    stream.end(imagem.buffer);
  },
};
