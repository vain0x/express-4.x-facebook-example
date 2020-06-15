window.GoogleSignIn = (function () {
  var it = {}

  it.onSignIn = function (googleUser) {
    var token = googleUser.getAuthResponse().id_token;

    const messageElement = document.getElementById("message")
    messageElement.textContent = "ログインしています……"

    fetch("/api/login/google", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      if (!res.ok) {
        throw new Error("failure")
      }

      setTimeout(() => {
        window.location.href = "/home"
      }, 500)
    }).catch(function(err) {
      console.error(err)
    })
  }

  return it
})()
