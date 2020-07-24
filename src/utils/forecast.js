const request = require('postman-request');

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4b1ddc388e65e47362ef3f8b85c121e7&query=';
    request({url:url+encodeURIComponent(longitude+','+latitude),json:true},(err,res,body) => {
        console.log(body);
        if (err) {
            console.log("error");
            callback(err,undefined);
        } else if(body.success === false) {
            console.log("Please check your query!");
            callback(err,undefined);
        } else {
            callback(err,body);
        }
    });
}

module.exports = {
    forecast,
}