
# Description
  This is a registration form that sends a response letter from Google mail. With the help of a check-box, it gives the opportunity to subscribe / unsubscribe from the mailing list.
## Technologies:
 `node.js, body-parser, mailer, html, bootstrap, gmail`.
## For start:
1. `npm i`
2. In the `nodemailer.js` file on lines 10,11,15 write the sender's mail data (your mail).
3. If you will not use google mail, you need to change the lines 6,7,8 in the `nodemailer.js` file.
4. Setting up your mail: 
- `https://myaccount.google.com/lesssecureapps`, log in using your mail / Google account. enable - untrusted applications allowed.
- `https://accounts.google.com/b/0/displayunlockcaptcha`, after the transition click on the "continue" button. Try sending the letter.
> If you have a problem `https://nodemailer.com/usage/using-gmail/` .
good luck
