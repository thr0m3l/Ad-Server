const express = require('express');
const bodyParser = require('body-parser');
const findArea = require('./map');
const gprmcParser = require('gprmc-parser');
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

let requestCount = 0;
app.get('/', (req, res) => {

  const { latitude, longitude } = latestData.geo;
  const { time, date } = latestData.gps;
  const { location, index } = findArea({ lat: latitude, lng: longitude });
  console.log({ output: location, fileName: index, location: [latitude, longitude], time, date }, requestCount++);
  res.status(200).json({ output: location, fileName: index, location: [latitude, longitude], time, date });
  console.log(index.length);
  // res.status(200).send(index);
});

let latestData = { geo: { latitude: 'default', longitude: 'default' }, gps: { time: 'default', date: 'default' } };


app.get('/data', (req, res) => {
  latestData = gprmcParser(req.query.gprmc);
  console.log(req.query);
  res.status(200).json({ message: 'Baaler data paisi' });
})

app.listen(PORT, () => {
  console.log(`Server running at at http://localhost:${PORT}`)
})


