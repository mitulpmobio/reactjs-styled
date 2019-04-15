let alexaVerifier = require('alexa-verifier');

exports.requestVerifier = function (req, res, next) {
    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
                res.status(401).json({
                    message: 'Verification Failure',
                    error: err
                });
            } else {
                next();
            }
        }
    );
}