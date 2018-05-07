Vue.component('sign-up', {
  template: `
   <div class="signUp"  v-cloak>
      <form @submit.prevent='onSignUp'>
        <h2>注册</h2>
        <button type="button"@click="$emit('close')">关闭</button>
        <div class="row">
          <label>邮箱</label>
          <input type="email" v-model="signUp.email" required>
        </div>
        <div class="row">
          <label>密码</label>
          <input type="password" v-model="signUp.password" required>
        </div>
        <div class="actions">
          <button type="submit">提交</button>
          <a href="#" @click="$emit('gotologin')">登录</a>
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
          alert('注册成功,已经自动帮你登录啦')
          this.$emit('signup', [user, this.signUp.email, this.signUp.password])
        },
        error => {
          if (error.code === 203) {
            alert('此邮箱已被注册')
          }
        }
      )
    }
  }
})
