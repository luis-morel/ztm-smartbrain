// Controller: Scan Image
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
    scanImage
};