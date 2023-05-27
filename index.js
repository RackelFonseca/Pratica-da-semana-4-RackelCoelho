const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

const porta = 443

//rotina login
app.use(session({ secret: '12134567890' }))

app.use(bodyParser.urlencoded({ extended: true }))

var login = 'admin'
var senha = '1234'

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './'))
/*
app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logado')
    console.log('Usuário logado: ' + req.session.login)
  }
  else {
    res.render('home')
  }
})

app.get('/', (req, res) => {
  if (req.body.password = senha && req.body.login == login) {//logado com sucesso
    req.session.login = login
    res.render('logado')
  }
  else {
    res.render('home')
  }
})
*/
app.post('/', (req, res) => {

  if (req.body.password === password && req.body.login === login) {
    //logado com sucesso
    req.session.login = login
    res.render('logado')
  }
  else {
    res.render('home')
  }
})

app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logado')
    console.log('Usuário logado: ' + req.session.login)
  }
  else {
    res.render('home')
  }

})






//rotina email
app.get('/', (req, res) => {
  res.send('Enviando e-mail com o Nodemailer!')
})

app.get("/sendemail", async (req, res) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7b6f6c1ce99eb6",
      pass: "be5c5994597f0f"
    }
  });

  var message = {
    from: "noreplay@rackel.com",
    to: "rackel@rackel.com",
    subject: "Instrução para recuperar a senha",
    text: " Rackel.\n\n Você solicitou alteração de senha. \n\n Att. Rackel Reprograme-se",
    html: "Prezado(a), <br><br> Você solicitou alteração de senha.<br><br> \n\n Att. Rackel <br>"
  };


  transport.sendMail(message, function(err) {
    if (err)
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: E-mail não enviado!"
      });
    else
      return res.json({
        erro: false,
        mensagem: "E-mail enviado com sucesso!"
      });
  });
});

app.listen(porta, () => {
  console.log("Servidor rodando")
});

// Middleware para processar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota para a página inicial(login)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

// Rota para a página de envio de e-mails após autenticação
app.get('/logado', (req, res) => {
  res.sendFile(__dirname + '/logado.html');
});

// Rota para a página de envio de e-mails
app.get('/email', (req, res) => {
  res.sendFile(__dirname + '/email.html');

  app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html');
  });
