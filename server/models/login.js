const jwt = require('jsonwebtoken');
const FB = require('fb');

class Login {
  static login(body){
    return new Promise(function(resolve,reject){
      let fb = new FB.Facebook({
        accessToken: body.accessToken,
        appId: process.env.FBAPPID,
        appSecret: process.env.FBAPPSECRET
      })

      fb.api(body.userId, function(response){
        if (response.error) {
          reject(error);
        } else {
          let token = jwt.sign({
            id: response.id,
            name: response.name
          },process.env.APPSECRET);
          resolve(token)
        }
      })
    })
  }
}

module.exports = Login;
