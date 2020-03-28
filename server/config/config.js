//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
    db: {
        uri: 'mongodb://127.0.0.1:27017/noahTest', //place the URI of your mongo database here.
    },
    sms: {
        rx_phone_num: '+12397761551',
        tx_phone_num: '+12057546632',
        sid: 'AC57fdbf0bb5d0edda10e85a708b8a3d02',
        auth_token: 'cbf2a372825816b18e6fec8968457a65',
    },
    email: {
        service: 'gmail',
        user: 'attractions.salon.noreply@gmail.com',
        pass: 'M.vqYjFdJT!s";9tb',
        rx_address: 'nzinn08@gmail.com'
    }
};
