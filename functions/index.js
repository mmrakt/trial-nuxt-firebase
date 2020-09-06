const functions = require('firebase-functions') // eslint-disable-line

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// eslint-disable-next-line
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {
    structuredData: true,
  })
  response.send('Hello from Firebase!')
})
