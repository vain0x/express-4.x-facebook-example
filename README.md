This is a fork of <https://github.com/passport/express-4.x-facebook-example>. Use Google to login instead of Facebook. Because both of them use OAuth2, this example is almost same.

See also the README of <https://github.com/jaredhanson/passport-google-oauth2>.

First, you need to create a google account, a new project, a credential and an OAuth client ID in <https://console.developers.google.com>. Note that you don't need payment setings or owned hostnames.

Second, make a configuration file with:

```sh
cp .env-example .env
```

and edit `.env` to fill your client ID and client secret like this:

```conf
PORT=8080
GOOGLE_CLIENT_ID=1111222233334444.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=aBcDeFgH_iJkLmN
GOOGLE_AUTH_CALLBACK=http://localhost:8080/auth/google/callback/
```

Finally npm install and run the server:

```sh
npm ci
node src/server.js
```

Visit <http://localhost:8080>.

Original README is below:

----

This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users using Facebook.  Use
this example as a starting point for your own web applications.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone git@github.com:passport/express-4.x-facebook-example.git
$ cd express-4.x-facebook-example
$ npm install
```

The example uses environment variables to configure the consumer key and
consumer secret needed to access Facebook's API.  Start the server with those
variables set to the appropriate credentials.

```bash
$ CLIENT_ID=__FACEBOOK_CLIENT_ID__ CLIENT_SECRET=__FACEBOOK_CLIENT_SECRET__ node server.js
```

Open a web browser and navigate to [http://localhost:3000/](http://localhost:3000/)
to see the example in action.


