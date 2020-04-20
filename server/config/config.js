//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
    db: {
        uri: 'mongodb://127.0.0.1:27017/noahTest', //place the URI of your mongo database here.
    },
    sms: {
        rx_phone_num: '+12397761551',
        tx_phone_num: '+12728080317',
        sid: 'AC82604389ac155ac6dbf555c4235a8834',
        auth_token: '8f43072b9a96722d6049ae155f8bb263',
    },
    email: {
        service: 'gmail',
        user: 'attractions.salon.noreply@gmail.com',
        pass: 'M.vqYjFdJT!s";9tb',
        rx_address: 'nzinn08@gmail.com'
    }
};
