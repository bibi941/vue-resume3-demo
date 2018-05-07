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
    onEdit(key, value) {
      let reg = /\[(\d+)\]/g //取到[number]
      key = key.replace(reg, (match, number) => {
        return '.' + number
      })
      keys = key.split('.') //keys=['skills','0','name']
      let result = this.resume
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value
        } else {
          result = result[keys[i]]
          //i=0,1,2 result=this.resume[skills][0][name]
        }
      }
    },
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
    addSkills() {
      this.resume.skills.push({
        name: '请填写技能名称',
        description: '请填写技能描述'
      })
    },
    removekills(index) {
      this.resume.skills.splice(index, 1)
    },
    addProjects() {
      this.resume.projects.push({
        name: '名称',
        link: 'www.baidu.com',
        keywords: '关键的1皮',
        descrip: '描述描述123333333333333333333333333333333333333333333333'
      })
    },
    removeProjects(index) {
      this.resume.projects.splice(index, 1)
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
