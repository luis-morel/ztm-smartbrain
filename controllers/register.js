// Controller: User Registration
const handleRegistration = (req, res, db, bcrypt, saltRounds) => {
    const { name, email, password } = req.body;
    if (name && email && password) {

        const newUser = {
            name,
            email,
            joined: new Date()
        };
        const hash = bcrypt.hashSync(password, saltRounds);
        db.transaction(trx => {
            trx.insert({ email, hash })
                .into('logins')
                .returning('email')
                .then(resultsSet => {
                    if (resultsSet.length) {
                        return db('users')
                            .insert(newUser)
                            .returning('*')
                            .then(user => {
                                if (user.length) res.json(user[0])
                                else res.status(400).json('Unable to register user.')
                            })
                    } else res.status(400).json('Unable to register user.')
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })
            .catch(error => res.status(400).json('Unable to register user'));
    }
    else res.status(400).json('Unable to register user.');
};

module.exports = {
    handleRegistration
};