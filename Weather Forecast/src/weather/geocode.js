const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXNoaXNoMTEwMSIsImEiOiJjanVyYmJicGcwNjh4NDRrZ3QzaTJzMTlsIn0.QUGhM-Mpw9x5yqWq68CAKg&limit=1'
    request({url: url, json: true}, (error, response) =>{
        if(error){
            callback("could't connect to internet.",undefined);
        } else if(response.body.features.length === 0){
            callback("could't finfd this location . Please try another one", undefined);
        } else{
           
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                lattitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;