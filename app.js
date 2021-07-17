const express = require('express');
const bodyParser = require('body-parser');
const findArea = require('./map');
const PORT = 8080;

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.get('/', (req, res) => {
  res.status(200).json({message: 'Haha vodox'});
});

app.get('/find', (req, res) => {
  const {lat, lng} = req.query;
  const result = findArea({lat: parseFloat(lat), lng: parseFloat(lng)});
  res.status(200).json({output : result});
});
  
app.listen(PORT, () => {
    console.log(`Server running at at http://localhost:${PORT}`)
})


