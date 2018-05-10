Vue.component('log-in', {
  template: `
  <div class="login"  v-cloak>
      <form @submit.prevent='onLogIn'>
        <h2>VueResume</h2>
        <div class="row">
          <label>邮箱</label>
          <el-input type="email" v-model="logIn.email" required placeholder="12345@qq.com" class='input' style='height:50px'>
        </div>
        <div class="row">
          <label>密码</label>
          <el-input type="password" v-model="logIn.password" required placeholder="password" class='input' style='height:50px'>
        </div>
        <div class="actions">
          <el-button type="primary" native-type='submit' >登录</el-button>
        </div>
        <div class='goto-signup'>
            <span>没有帐号？</span><a @click="$emit('gotosignup')">注册</a>
        </div>
        <div class='discript'>
          <span>Designed by bibi in ChengDu &copy</span>
        </div>
      </form>
    </div>
    `
  ,
  data() {
    return { logIn: { email: '', password: '' } }
  },
  methods: {
    onLogIn() {
      //登录
      AV.User.logIn(this.logIn.email, this.logIn.password).then(
        user => {
          this.$emit('login', user)
        },
        error => {
          if (error.code === 211) {
            this.open('邮箱不存在')
          } else if (error.code === 210) {
            this.open('邮箱和密码不匹配')
          }
        }
      )
    },
    open(message) {
      this.$alert(message, '来自bibi的提示', { confirmButtonText: '确定' })
    }
  }
})
