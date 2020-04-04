const express = require('express')//импортируем экспресс
const bodyParser = require('body-parser')
const mailer = require('./nodemailer') //импортировали функцию мейлер

const app = express()//cозд приложение эп, с её помощью нам доступны все функции экспресс

const PORT = 3001 
let user = undefined  

app.use('/css', express.static (__dirname + '/node_modules/bootstrap/dist/css'))//с помощью метода юз указали путь к статической папке.1) адрес по которому будет доступна статическая папка, 2)указываем полный путь к папке на локальной машине
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/registration',(req,res) =>{//создаём обработчик метода пост запроса. 1) аргумент это адрес на который будут отправляться данные. 2) функция с арг рек и рес
    if(!req.body.email || !req.body.pass) return res.sendStatus(400)
    // console.log(req.body)
    const message={
        to: req.body.email,
        subject: 'Congratulations! You are succefully registrated on our site',
        html: `<h2>Поздравляем, вы успешно зарегистрировались на сайте Good Worker!</h2>
        <i> Данные вашей учётной записи: <i>
        <ul>
            <li> Login: ${req.body.email}
            <li> Password: ${req.body.pass}
        </ul>
        ${req.body.promo ? `Вы подписаны на рассылку уведомлений и рабочих предложений, чтобы отписаться от рассылки перейдите по ссылке <a href="http://localhost:3001/unsubscribe/${req.body.email}"> отписаться от рассылки</a>` : ''}
        <p> Данное письмо не требует ответа.`
    }
    mailer(message)//отправляем клиенту емейл и передаём ему объект месседж, выше он указан
    user = req.body;
    res.redirect('/registration')
   // res.send(`Registration completed successfully. Data sent to email: ${req.body.email}`)
})

//в метод гет передаём два параметра 1)адрес. 2)функция. При обращении по адресу клиент будет получать либо страницу либо текст. При переходе по ссылке регистрейшн будет отправлен текст на клиент. Аргументами функции являются рек и рес
app.get('/registration',(req,res) => {  
    //res.send('Registration page')
    if(typeof user!=='object')return res.sendFile(__dirname +'/registration.html')
    res.send(`Registrerion completed successfully. Data sent to email: ${user.email}`)
    user = undefined
})

app.get('/unsubscribe/:email', (req, res) => {//обработка отписки от рассылки
    console.log(`${req.params.email} unsubscibed`)//указали емеил  виде параметра//
    res.send(`Ваш email: ${req.params.email} удалён из списка рассылки!`)//на клиент
})
//с помощью метода лисен запускаем сервер. Необходимо передать порт на котором будем поднимать сервер и второй аргумент это функция которая будет выводить сообщение о том что сервер работает и ссылку на страницу.
app.listen(PORT,() => console.log('server listening at http://localhost:3001/registration'))
//${PORT}- позволяет выводить значение переменной
