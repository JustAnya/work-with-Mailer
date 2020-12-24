const express = require('express')
const bodyParser = require('body-parser')
const mailer = require('./nodemailer') 

const app = express()

const PORT = 3001 
let user = undefined  

app.use('/css', express.static (__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/registration',(req,res) =>{
    if(!req.body.email || !req.body.pass) return res.sendStatus(400)
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
    mailer(message)
    user = req.body;
    res.redirect('/registration')
})


app.get('/registration',(req,res) => {  
    if(typeof user!=='object')return res.sendFile(__dirname +'/registration.html')
    res.send(`Registrerion completed successfully. Data sent to email: ${user.email}`)
    user = undefined
})

app.get('/unsubscribe/:email', (req, res) => {
    console.log(`${req.params.email} unsubscibed`)
    res.send(`Ваш email: ${req.params.email} удалён из списка рассылки!`)
})

app.listen(PORT,() => console.log('server listening at http://localhost:3001/registration'))
