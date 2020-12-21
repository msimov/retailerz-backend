const admin = require("firebase-admin");

const serviceAccount = require("../config/fbServiceAccount.config.js");

admin.initializeApp({
    credential: admin.credential.cert({
        type: serviceAccount.TYPE,
        project_id: serviceAccount.PROJECT_ID,
        private_key_id: serviceAccount.PRIVATE_KEY_ID,
        private_key: serviceAccount.PRIVATE_KEY,
        client_email: serviceAccount.CLIENT_EMAIL,
        client_id: serviceAccount.CLIENT_ID,
        auth_uri: serviceAccount.AUTH_URI,
        token_uri: serviceAccount.TOKEN_URI,
        auth_provider_x509_cert_url: serviceAccount.AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: serviceAccount.CLIENT_CERT_URL
    }),
});

module.exports = function(req, res, next) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        req.authToken = req.headers.authorization.split(' ')[1];
      } else {
        req.authToken = null;
      }
      next();
}
