const nodemailer= require('nodemailer')

const transporter =nodemailer.createTransport({
    pool: true, 
   // maxConnections: 6,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'writeyourmailthis. Sender_mail',
        pass: 'password_sender_mail'
        }
    },
    {
        from: 'Good Worker <writeyourmail>',
    }
) 

const mailer = message =>{ 
    transporter.sendMail(message,(err,info)=>{ 
        if(err)return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports= mailer
