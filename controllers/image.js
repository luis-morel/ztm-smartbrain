// Clarifai API Import\Config
const Clarifai = require('clarifai');
const clarifaiApp = new Clarifai.App({
    apiKey: 'df14baa54e7b4e24983c322bd3b707ed'
});

// Controller: Scan Image
const handleApiCall = (req, res) => {
    clarifaiApp.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to reach Clarifai'));
};

const scanImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(result => res.json(result[0]))
        .catch(error => {
            console.log("\nError:\n", error);
            res.status(400).json("Unable to retrieve entries.");
        });
};

module.exports = {
    handleApiCall,
    scanImage
};