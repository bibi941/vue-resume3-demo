let app = new Vue({
  el: '#app',
  data: {
    editName: false,
    logInVisable: false,
    signUpVisable: false,
    resume: {
      name: 'bibi',
      birthy: '1994.08.24',
      job: '前端工程师',
      sex: '男',
      email: 'sssrrrr@vip.qq.com',
      phone: '17608003060'
    },
    signUp: {
      email: '',
      password: ''
    },
    logIn: {
      email: '',
      password: ''
    },
    //展示到页面上的信息
    lonInMessage: {
      email: ''
    }
  },
  methods: {
    onEdit(key, value) {
      this.resume[key] = value
    },
    onSignUp(e) {
      //注册
      let user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then(
        user => {
          alert('注册成功,已经自动帮你登录啦')
          this.signUpVisable = false
          //自动登录
          AV.User.logIn(this.signUp.email, this.signUp.password).then(
            user => {
              this.lonInMessage = user.attributes.email
            },
            error => {
              console.log(error)
            }
          )
        },
        error => {
          if (error.code === 203) {
            alert('此邮箱已被注册')
          }
        }
      )
    },
    onLogIn() {
      //登录
      AV.User.logIn(this.logIn.email, this.logIn.password).then(
        user => {
          this.logInVisable = false
        },
        error => {
          if (error.code === 211) {
            alert('邮箱不存在')
          } else if (error.code === 210) {
            alert('邮箱和密码不匹配')
          }
        }
      )
    },
    onLogOut() {
      //登出
      if (new AV.User()) {
        AV.User.logOut()
        alert('注销成功')
        window.location.reload()
      }
    },
    OnClickSave() {
      //保存
      let currentUser = AV.User.current()
      if (currentUser) {
        this.savaResume()
      } else {
        this.logInVisable = true
      }
    },
    savaResume() {
      let id = AV.User.current().id
      let user = AV.Object.createWithoutData('User', id)
      user.set('resume', this.resume)
      user.save().then(
        () => {
          alert('保存成功')
        },
        () => {
          alert('保存失败')
        }
      )
    },
    onCloseLogin() {},
    getResume() {
      let user = new AV.Query('User')
      user.get(AV.User.current().id).then(
        data => {
          this.resume = data.attributes.resume
        },
        () => {}
      )
    }
  }
})
if (AV.User.current()) {
  app.getResume()
}
