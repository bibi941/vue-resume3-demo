Vue.component('log-in', {
  template: `<div class="login"  v-cloak>
      <form @submit.prevent='onLogIn'>
        <h2>登录</h2>
        <button type="button" @click="$emit('close')">关闭</button>
        <div class="row">
          <label>邮箱</label>
          <input type="email" v-model="logIn.email" required>
        </div>
        <div class="row">
          <label>密码</label>
          <input type="password" v-model="logIn.password" required>
        </div>
        <div class="actions">
          <button type="submit">提交</button>
          <el-button @click="$emit('gotosignup')" type="primary" >注册</el-button>
        </div>
      </form>
    </div>`,
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
            alert('邮箱不存在')
          } else if (error.code === 210) {
            alert('邮箱和密码不匹配')
          }
        }
      )
    }
  }
})
