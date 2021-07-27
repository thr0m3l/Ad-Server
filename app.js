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
  console.log(requestCount++);
  res.status(200).json({ output: location, fileName: index, location: [latitude, longitude], time, date });
});

let latestData = { geo: { latitude: 'default', longitude: 'default' }, gps: { time: 'default', date: 'default' } };


app.get('/data', (req, res) => {
  data = gprmcParser(req.query.gprmc);

  const time = new Date(data.gps.date + ' ' + data.gps.time);
  const latestTime = new Date(latestData.gps.date + ' ' + latestData.gps.time);

  if (time.getTime() > latestTime.getTime() || latestData.gps.time === 'default'){
    latestData = data;
    console.log(data);
  }

  res.status(200).json({ message: 'Data well received' });
});

let sosData = [];

app.get('/sos', (req, res) => {
  console.log('Received SOS');
  sosData.push({latestData, deviceId: req.query.id});
  console.log(sosData);
  const { latitude, longitude } = latestData.geo;
  const { time, date } = latestData.gps;
  const { location, index } = findArea({ lat: latitude, lng: longitude });
  console.log(requestCount++);
  res.status(200).json({ output: location, fileName: index, location: [latitude, longitude], time, date });

});

app.get('/getsos', (req, res) => {
  console.log("Sending SOS data");

  if (req.query.mode && req.query.mode === 'clear') {
    sosData = [];
  }

  res.status(200).json({sosData});
});


app.listen(PORT, () => {
  console.log(`Server running at at http://localhost:${PORT}`)
})


