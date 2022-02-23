const express = require('express');
const cors = require('cors');
const fileHandler = require('../api/routes/fileHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileHandler);

app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
