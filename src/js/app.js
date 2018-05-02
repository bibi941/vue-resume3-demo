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
    }
  },
  methods: {
    onEdit(key, value) {
      this.resume[key] = value
    },
    OnClickSave() {
      let currentUser = AV.User.current()
      if (currentUser) {
        this.savaResume()
      } else {
        this.logInVisable = true
      }
      // let Users = AV.Object.extend('Users')
      // let user = new Users()
      // user.set('resume', this.resume)
      // user.save().then(() => {}, () => {})
    },
    savaResume() { },
    onCloseLogin() {
    }
  }
})