const router = require('express').Router();
module.exports = router;

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'api-key.json'
});

router.put('/:image', async (req, res, next) => {

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./test.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));

  res.send(labels);
});
