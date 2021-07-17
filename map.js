const fs = require('fs');
const isInsidePolygon = require('./polygon');


//@docs
//point = {lat : number, lng : number}

const findArea = (point) => {
    const obj = JSON.parse(fs.readFileSync('area.json', 'utf8'));
    const areas = obj.areas;

    for(var i = 0; i < areas.length; i++){
        if (isInsidePolygon(point, areas[i].points)){
            console.log(areas[i].area);
            return areas[i].area;
        }
    }
    return 'point is not inside any defined area';
}

// const obj = JSON.parse(fs.readFileSync('area.json', 'utf8'));
//     const areas = obj.areas;
// console.log(isInsidePolygon({ lat: 24.37157, lng: 88.6338 }, areas[0].points));


module.exports = findArea;


