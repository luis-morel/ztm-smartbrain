// Controller: Profile
const getProfile = (req, res, db) => {
    const { id } = req.params;
    db.select()
        .from('users')
        .where({ id })
        .then(user => {
            if (user.length) res.json(user[0])
            else res.json("User not found");
        })
        .catch(error => {
            console.log("\nError:\n", error);
            res.status(400).json("Oops, something went wrong.");
        });
};

module.exports = {
    getProfile
};