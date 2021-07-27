const fs = require('fs');
const isInsidePolygon = require('./polygon');


//@docs
//point = {lat : number, lng : number}

const findArea = (point) => {
    const obj = JSON.parse(fs.readFileSync('area.json', 'utf8'));
    const areas = obj.areas;

    for (var i = 0; i < areas.length; i++) {
        if (isInsidePolygon(point, areas[i].points)) {
            return { location: areas[i].area, index: `${i}.txt` };
        }
    }
    return { location: 'Out of area', index: `69.txt` };
}

// const obj = JSON.parse(fs.readFileSync('area.json', 'utf8'));
//     const areas = obj.areas;
// console.log(isInsidePolygon({ lat: 24.37157, lng: 88.6338 }, areas[0].points));


module.exports = findArea;


