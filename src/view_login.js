exports.renderLogin = props => `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Google サインイン用 -->
    <meta name="google-signin-scope" content="email profile">
    <meta name="google-signin-client_id" content="${props.GOOGLE_CLIENT_ID}">
    <script src="https://apis.google.com/js/platform.js" async defer></script>

    <!-- アプリ用 -->
    <title>ログイン | アプリ</title>
    <link rel="stylesheet" href="main.css"></link>

    <script src="google-sign-in.js" async defer></script>
    <script>
      function onSignIn(googleUser) {
        return GoogleSignIn.onSignIn(googleUser)
      }
    </script>
  </head>
  <body>
    <main>
      <div class="g-signin2" data-onsuccess="onSignIn" data-theme="light">
        ログイン
      </div>

      <div id="message">
      </div>
    </main>
  </body>
  </html>
`
