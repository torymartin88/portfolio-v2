const request = require('request')

module.exports = (req, res) => {
    const url = `https://api.darksky.net/forecast/618ee46bab6b7bd5d7836bf24bf307d2/${req.body.lat},${req.body.long}`

    request(url, (err, res, body) => {
        if (err) { res.status(400).send('error') }
        res.status(200).send(body);
    })
};
