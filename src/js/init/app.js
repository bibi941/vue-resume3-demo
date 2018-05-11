let app = new Vue({
  el: '#app',
  data: {
    editName: false,
    logInVisable: false,
    signUpVisable: false,
    sharaVisable: false,
    currentUser: { id: '' },
    previewUser: { id: '' },
    previewResume: {},
    userMessage: '',
    shareLink: '',
    mode: 'edit', //preview
    resume: {
      name: 'bibi',
      birthy: '1994.08.24',
      job: '前端工程师',
      sex: '男',
      email: 'sssrrr@vip.qq.com',
      phone: '17608003060',
      skills: [
        { name: 'Vue', description: '了解Vuex+Vue-cli+Vue-Router' },
        { name: 'CSS-LESS+SCSS', description: '百分百还原设计稿' }
      ],
      projects: [
        {
          name: '移动端网易云音乐',
          link: 'www.baidu.com',
          keywords: 'jq+parcel+qiniu+leancloud',
          descrip: '移动端+电脑端后台+各种功能'
        },
        {
          name: '移动端画板',
          link: 'www.baidu.com',
          keywords: 'canvas',
          descrip: '一个小画板而已'
        }
      ]
    }
  },
  watch: {
    'currentUser.id': function(newValue, oldValue) {
      if (newValue) {
        this.getResume(this.currentUser)
      }
    }
  },
  computed: {
    displayResume() {
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
  methods: {
    onLogOut() {
      //登出
      if (new AV.User()) {
        AV.User.logOut()
        this.userMessage = ''
        swal({
          title: '你已经成功退出',
          text: '2s后将自动回到主界面',
          timer: 2000,
          showConfirmButton: false
        })
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    },
    onLogIn(user) {
      console.log('执行登录')
      this.currentUser = AV.User.current()
      this.userMessage = AV.User.current().toJSON()
      this.logInVisable = false
      this.getResume(this.currentUser).then(resume => {
        app.resume = resume
      })
      app.shareLink =
        location.origin + location.pathname + '?user_id=' + app.currentUser.id
    },
    onSignUp(user) {
      this.signUpVisable = false
      //先保存到leancloud
      this.savaResume('signup')
      //自动登录
      AV.User.logIn(user[1], user[2]).then(
        user => {
          this.onLogIn()
        },
        error => {
          console.log(error)
        }
      )
    },
    onClickSave() {
      //保存
      // let currentUser = AV.User.current()
      if (this.currentUser) {
        console.log(11111)
        this.savaResume()
      } else {
        console.log(22222)
        this.logInVisable = true
      }
    },
    savaResume(string) {
      //会根据有没有 id 来决定是新增还是更新一个对象
      let id = AV.User.current().id
      let user = AV.Object.createWithoutData('User', id)
      user.set('resume', this.resume)
      user.save().then(
        () => {
          if (string) {
          } else {
            swal({
              title: '保存成功',
              type: 'success',
              confirmButtonText: 'Ok'
            })
          }
        },
        () => {
          swal({
            title: '保存失败',
            type: 'warning',
            confirmButtonText: 'Ok'
          })
        }
      )
    },
    getResume(user) {
      let query = new AV.Query('User')
      return query.get(user.id).then(
        data => {
          let resume = data.attributes.resume
          return resume
        },
        () => {}
      )
    },
    print() {
      window.print()
    }
  }
})

//如果你是帐号登录的,刷新还在
app.currentUser = AV.User.current()

if (AV.User.current()) {
  app.userMessage = AV.User.current().toJSON()
}
if (app.currentUser) {
  app.getResume(app.currentUser).then(resume => {
    app.resume = resume
  })
  //保证分享功能
  app.shareLink =
    location.origin + location.pathname + '?user_id=' + app.currentUser.id
}

//如果你是分享的连接
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if (matches) {
  userId = matches[1]
  app.mode = 'preview'
  app.getResume({ id: userId }).then(resume => {
    app.previewResume = resume
  })
}
