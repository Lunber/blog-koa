var User = require('../model/user.js')

const login = function *(next){
  console.log(this.request.body.pwd)
  console.log(this.session)
  return User.find((err, users) => {
      console.log(users[0].password)
      console.log(this.request.body.pwd)
      if (this.request.body.pwd == users[0].password) {
          this.response.body = {
              msg: 'success',
              code: '1'
          }
          this.session.login = "login"
          console.log(this.session.login)
          console.log(this.session)
      } else {
          this.response.body = {
              msg: 'false',
              code: '0'
          }
      }
  })
}

const signOut =  function*(next) {
    this.response.body = {
        msg: 'success',
        code: '1'
    }
    this.session.login = ""
}

const checkLogin = function*(next) {
    if (!this.session.login) {
        return this.redirect('/admin')
    }
    yield next
}

module.exports = {
  login,
  signOut,
  checkLogin
}
