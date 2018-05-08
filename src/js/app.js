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
    shareLink: '',
    mode: 'edit', //preview
    resume: {
      name: 'bibi',
      birthy: '1994.08.24',
      job: '前端工程师',
      sex: '男',
      email: 'sssrrrr@vip.qq.com',
      phone: '17608003060',
      skills: [
        { name: '名字', description: '我啥都会' },
        { name: '名字', description: '我啥都会' },
        { name: '名字', description: '我啥都会' },
        { name: '名字', description: '我啥都会' }
      ],
      projects: [
        {
          name: '名称',
          link: 'www.baidu.com',
          keywords: '关键的1皮',
          descrip: '描述描述'
        },
        {
          name: '名称',
          link: 'www.baidu.com',
          keywords: '关键的1皮',
          descrip: '描述描述123333333333333333333333333333333333333333333333'
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
        alert('注销成功')
        window.location.reload()
      }
    },
    onLogIn(user) {
      this.currentUser = AV.User.current()
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
        this.savaResume()
      } else {
        this.logInVisable = true
      }
    },
    onShare() {
      if (this.currentUser) {
        this.sharaVisable = true
      } else {
        alert('请先登录')
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
            alert('保存成功')
          }
        },
        () => {
          alert('保存失败')
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
