Vue.component('share', {
  props: ['shareLink'],
  template: `
  <div class="share" v-cloak>
      <h2>请复制下面的链接</h2>
      <div>{{shareLink}}</div>
      <el-button type="primary" @click="$emit('exit')">退出</el-button>
  </div>`
})
