var app = require('./config/custon-express')();
const SV_PORT = 3000;
const SV_IP = 'localhost';
app.listen(SV_PORT, SV_IP, function () {
    console.log('Escutando no ip: ', SV_IP, ', porta: ', SV_PORT);
});
