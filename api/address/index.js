const request = require('request')

var googleAPIKey = 'AIzaSyCubFpd6mJtGVC-Hynvf9jURT21lgVwoz8'

module.exports = (req, res) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.long}&key=${googleAPIKey}`
    const origRes = res

    request(url, (err, res, body) => {
        if (err) { origRes.status(400).send('google lookup error') }
        origRes.status(200).send(body)
    })
};
