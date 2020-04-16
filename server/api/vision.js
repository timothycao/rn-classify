const router = require('express').Router();
const fetch = require('node-fetch');
module.exports = router;

router.put('/:image', async (req, res, next) => {
  const { image } = req.params;
  const apiResponse = await fetch();

  const labels = await apiResponse.json();
  res.send(labels);
});
