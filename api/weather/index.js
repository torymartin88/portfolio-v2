const request = require('request')

var darkSkyAPIKey = '618ee46bab6b7bd5d7836bf24bf307d2'

module.exports = (req, res) => {
    const url = `https://api.darksky.net/forecast/${darkSkyAPIKey}/${req.body.lat},${req.body.long}`
    const origRes = res

    request(url, (err, res, body) => {
        if (err) { origRes.status(400).send('darksky error') }
        origRes.status(200).send(body)
    })
};
