const request = require('postman-request');

const geo = (address, callBack)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidWtoeXVuMjQwMiIsImEiOiJja2N0dHE1MzUyMjFtMnJzNm03bjB2MDZnIn0.Jh0iufXMGaN3LugmoNhBlg&limit=1';
    request({ url, json:true },(err,res,body)=>{
        if (err) {
            callBack('Unnable to connect to location',undefined);
        } else if (body.features.length === 0) {
            callBack('Unnable to find location, Try another Search',undefined);
        } else {
            callBack(undefined,{
                location: body.features[0].place_name,
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
            });
        }
    })
}

module.exports = {
    geo,
};