const request = require('request');

const forecast = (longitude, lattitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/bc503fb940d67fc18194d016d34ec2b0/' + lattitude + ',' + longitude + '?unit=si';
    request({url: url, json: true}, (error, response) =>{
        if(error){
            callback('Internet is not working ', undefined);
        } else if(response.body.error){
             callback('Unable to find the cordinates', undefined);
        } else{
            callback(undefined, response.body.daily.summary + 'it is ' + response.body.currently.temperature + ' degree fahrenheit out there');
        }
    })
}

module.exports = forecast;