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

      // fb.api(body.userId, function(response){
      fb.api('me',{fields:['id','name','email','picture.type(large)'],access_token:body.accessToken},function(response){

        if (response.error) {
          reject(response.error);
        } else {
          let token = jwt.sign({
            id: response.id,
          },process.env.APPSECRET);          
          resolve({token:token,profil:response.picture.data.url,name:response.name})
        }
      })
    })
  }
}

module.exports = Login;
