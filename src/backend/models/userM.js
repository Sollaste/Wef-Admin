const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

var user = mongoose.createConnection('mongodb://mongodb/loginApp')

// Définition du modèle d'utilisateur dans mongoDB
var User = user.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// TMP, in some cases, this backend container is restarted but not mongo. only create admin if it doesnt exists yet
async function look_for_admin_account() {
    await User.findOne({username: "admin"}).then(admin => {
        if (!admin) {
            if (process.env.ADMIN_PASS !== undefined) {
                bcrypt.hash(process.env.ADMIN_PASS, 17).then(hash => {
                    User.collection.insertOne({ username: "admin", password: hash})
                })
            } else {
                throw "Please specify admin password with env variable ADMIN_PASS"
            }
        }
    })
}
look_for_admin_account()

module.exports = User;