var nodemailer = require('nodemailer');
var google = require('googleapis');

var CLIENT_ID='751155627442-brq1a7k2ik776de4m6kk35a4ggi50goh.apps.googleusercontent.com';
var CLIENT_SECRET='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';
var REDIRECT_URI='https://developers.google.com/oauthplayground';
var REFRESH_TOKEN='1//04p8n3RAwpJXdCgYIARAAGAQSNwF-L9Ir4Msy1JytsPzXzNaMHMOx7M80R5LWVJf57djDWp938zGIQGPcbSeJgLkmBxxIJAxRJbQ';

var oAuth2Client = new google.Auth.OAuth2Client(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
//google.auth.oAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);

oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

function sendMail(req, res){
    var get_email = req.params['email']
    
    var _accessToken = oAuth2Client.getAccessToken();
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:'thiagotester8@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:_accessToken
        }
    });
    var mailOptions = {
        from:'Administrator <thiagotester8@gmail.com>',
        to: get_email,
        subject:'Recuperación de contraseña',
        text:'Hello desde nodejs',
        html:'<h1>Objeto de prueba</h1>',
        
    };

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            res.status(500).json(err);
        }else if(!info){
            res.status(400).json();
        }else{
            console.log("Email enviado");
            res.status(200).json(req.body);
        }
    });

}
module.exports = {
    sendMail
};