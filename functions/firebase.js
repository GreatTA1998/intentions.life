const admin = require('firebase-admin');
const configJson = require('./adminConfig.json');
const config = {
  credential: admin.credential.cert(configJson),
};
admin.initializeApp();

exports.firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);
