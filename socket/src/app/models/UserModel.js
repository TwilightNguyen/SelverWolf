const db = require('../../config/db');

const User = function (user) {
    this.id = user.id;
    this.user_email = user.user_email;
    this.user_pass = user.user_pass;
    this.user_url = user.user_url;
    this.user_name = user.user_name;
    this.user_gender = user.user_gender;
    this.user_birthday = user.user_birthday;
    this.user_registered = user.user_registered;
    this.user_last_activity = user.user_last_activity;
    this.user_activation_key = user.user_activation_key;
    this.user_status = user.user_status;
};

User.getAll = (result) => {
    let query = 'SELECT * FROM user';

    db.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        //console.log('course: ', res);
        result(null, res);
    });
};

User.login = (info, result) => {
    let query =
        `SELECT * FROM user WHERE user.username='` + info.username + `' AND user.password = '` + info.password + `'`;
    console.log(query);
    db.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

User.insert = (info, result) => {
    let query =
        `insert into w_users(user_name, user_pass, user_email, user_registered, user_firstname, user_lastname, user_birthday, user_status) values('` +
        info.username +
        `','` +
        info.password +
        `','` +
        info.email +
        `',now(),'` +
        info.firstName +
        `','` +
        info.lastName +
        `','` +
        info.birthday +
        `',1);`;
    console.log(query);
    db.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = User;
