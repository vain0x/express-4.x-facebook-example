require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express');
const morgan = require('morgan')
const session = require('express-session')
const { OAuth2Client } = require('google-auth-library')

const { renderLogin } = require("./view_login")
const { renderHome } = require("./view_home")

const ensureLoggedIn = downstream => (req, res, next) => {
  const user = req.session.user
  if (req.session.user == null) {
    console.log("not logged in")
    return res.redirect("/login")
  }

  return downstream(user, req, res, next)
}

const main = () => {
  const {
    PORT,
    GOOGLE_CLIENT_ID,
  } = process.env

  if (!GOOGLE_CLIENT_ID) {
    throw new Error("setup .env")
  }

  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(morgan('combined'))
  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))

  app.post("/api/login/google",
    (req, res) => {
      console.log("body = ", req.body)
      const { token } = req.body

      const client = new OAuth2Client(GOOGLE_CLIENT_ID)
      const verify = async () => {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        })
        const payload = ticket.getPayload()
        console.log("payload = ", payload)

        req.session.user = {
          avatarUri: payload["picture"],
          email: payload["email_verified"] ? payload["email"] : null,
          displayName: payload["name"],
          sub: payload["sub"],
        };
      }
      verify().then(
        () => res.status(200).send("OK"),
        err => {
          console.error(err)
          res.status(401).end()
        })
    })

  app.get("/login",
    (req, res) => {
      res.send(renderLogin({
        GOOGLE_CLIENT_ID,
      }))
    })

  app.get('/',
    (req, res) => {
      res.send(`
         <html>
         <body>
           <a href="/login">ログイン</a>
         </body>
         </html>
      `)
    })

  app.get("/logout", (req, res) => {
    req.session.user = {}
    res.redirect("/")
  })

  app.get('/home', ensureLoggedIn((user, req, res) => {
    res.send(renderHome({ user }))
  }))

  app.use(express.static(__dirname + "/../docs"))

  const port = PORT ?? 8080
  app.listen(port, () => {
    console.debug('listening http://localhost:' + port)
  })
}

main()
