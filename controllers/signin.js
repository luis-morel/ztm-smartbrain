// Controller: User Sign In
const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (email != '' && password != '') {
        db.select()
            .from('logins')
            .where({ email })
            .then(resultsSet => {
                if (resultsSet.length) {
                    bcrypt.compare(password, resultsSet[0].hash, (error, result) => {
                        if (result) {
                            db.select()
                                .from('users')
                                .where({ email })
                                .then(user => res.json(user[0]))
                                .catch(error => res.status(400).json("Unable to retrieve user."));
                        } else res.status(400).json("Invalid login. Please try again.");
                    });
                } else res.status(400).json("Invalid login. Please try again.");
            })
            .catch(error => res.status(400).json("Something went wrong. Please try again."));
    } else res.status(400).json("Invalid login. Please try again.");
};

module.exports = {
    handleSignIn
};
