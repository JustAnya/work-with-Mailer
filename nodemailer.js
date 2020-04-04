const nodemailer= require('nodemailer')

const transporter =nodemailer.createTransport({//константа в кот будут храниться настройки почтового сервера
    pool: true, //для большого количества оединений, можно удалить
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

const mailer = message =>{//функция которая занимается отправкой email, в качестве аргумента передаём объект месседж. Объект месседж  мбудет содержать само сообщение кот мы будем отправлять клинту 
    transporter.sendMail(message,(err,info)=>{ //в метод сендмеил аргументы сообщение и функция
        if(err)return console.log(err)//если во время отправки сообщения произошла ошибка, то данне о ней будут выведены на консоль
        console.log('Email sent: ', info)//если всё ок, мы увидим данные оботправленном сообщении
    })
}

module.exports= mailer//экспортируем функцию мейлер, чтобы использовать её на сервере при регистрации