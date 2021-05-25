const admin = require('firebase-admin');
const loadKeys = require('./loadKeys');

  admin.initializeApp({
    credential: admin.credential.cert(loadKeys())
  });

