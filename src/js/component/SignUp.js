Vue.component('sign-up', {
  template: `
   <div class="signUp"  v-cloak>
      <form @submit.prevent='onSignUp'>
        <h2>VueResume</h2>
        <div class="row">
          <label>邮箱</label>
          <el-input type="email" v-model="signUp.email" required placeholder="12345@qq.com" class='input' style='height:50px'>
        </div>
        <div class="row">
          <label>密码</label>
          <el-input type="password" v-model="signUp.password" required placeholder="password" class='input' style='height:50px'>
        </div>
        <div class="actions">
          <el-button type="primary" native-type='submit' >注册</el-button>
        </div>
        <div class='goto-login'>
            <span>已有帐号？</span><a @click="$emit('gotologin')">登录</a>
        </div>
        <div class='discript'>
          <span>Designed by bibi in ChengDu &copy</span>
        </div>
      </form>
    </div>`,
  data() {
    return { signUp: { email: '', password: '' } }
  },
  methods: {
    onSignUp() {
      //注册
      let user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then(
        user => {
          this.open('注册成功,帮你登录啦')
          this.$emit('signup', [user, this.signUp.email, this.signUp.password])
        },
        error => {
          if (error.code === 203) {
            this.open('此邮箱已被注册')
          }
        }
      )
    },
    open(message) {
      this.$alert(message, '来自bibi的提示', { confirmButtonText: '确定' })
    }
  }
})
