module.exports = (req, res) => {
    const url = `https://api.darksky.net/forecast/618ee46bab6b7bd5d7836bf24bf307d2/${req.body.lat},${req.body.long}`
    res.status(200).send(url);
};
