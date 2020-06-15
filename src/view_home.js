exports.renderHome = props => {
  const { user } = props
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <!-- アプリ用 -->
      <title>ホーム | アプリ</title>
      <link rel="stylesheet" href="main.css"></link>
    </head>
    <body>
      <header>
        こんにちは ${user.displayName ? 'John Doe' : ''} さん

        <a href="/logout">
          [ログアウト]
        </a>
      </header>

      <main>
        <h2>
          メニュー
        </h2>

        <ul>
          <li>
            <a href="https://google.com/">グーグル検索</a>
          </li>
          <li>
            <a href="https://meet.google.com/">グーグル meet</a>
          </li>
        </ul>
      </main>
    </body>
    </html>
  `
}
