const emailConfig = require('./mail-credentials');
var mailgun = require('mailgun-js')({apiKey: emailConfig.apiKey, domain: emailConfig.domain});

module.exports = async function sendPasswordResetEmail(EmailIDTo, data) {
  return new Promise((resolve)=> {
    var body = 'Your new Password is : ' +data;
  var emailData = {
    from: 'Passwork Changed <prathamesh@airlock.in>',
    to: EmailIDTo,
    subject: 'Password Changed',
    text: body
  };
  mailgun.messages().send(emailData, (error, response)=> {
    if(error){
      resolve(false);
      return false;
    }
      resolve(true);
      return true;
  });
  });
}
