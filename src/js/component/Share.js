Vue.component('share', {
  props: ['shareLink'],
  template: `
  <transition name="el-fade-in-linear">
  <div class="share" v-cloak>
      <h2>请复制下面的链接</h2>
      <div>{{shareLink}}</div>
      <el-button type="primary" @click="$emit('exit')">ok</el-button>
  </div>
   </transition>
  `
})
