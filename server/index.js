const express = require('express');
const app = express();

app.use('/api', require('./api'));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(
    `Listening at http://localhost:${PORT}`
  )
});
