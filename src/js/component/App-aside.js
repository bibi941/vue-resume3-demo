Vue.component('app-aside', {
  props: ['mode', 'logoutVisable','shareLink','userMessage'],
  template: `  
  <aside v-show="mode==='edit'">
      <div class="upper">
        <div>
          <img src='./img/vue.jpg' >
        </div>
        <div class='top-logo'>
          VueResume
        </div>
        <ul class="actions">
          <li>
            <el-button @click="$emit('onclicksave')" class="el-button" type="primary">保存</el-button>
          </li>
          <li>
            <el-button type="info"  @click="send">编辑</el-button>
          </li>
          <li v-show='shareLink'>
            <el-button  type="success" @click="swal({title:'恭喜,这是你的分享连接',text: shareLink,type: 'success',confirmButtonText: 'Ok'})" >分享</el-button>
          </li>
          <li>
            <el-button type="warning" @click="$emit('onprint')">打印</el-button>
          </li>
          <li>
            <el-button type="danger" @click="$emit('onlogout')" v-show="logoutVisable">登出</el-button>
          </li>
        </ul>
        <div class='user-message'>
        <span v-show='userMessage'>你好,</span>
        <span/>{{userMessage.email}}</span>
        </div>
      </div>
    </aside> `,

  data() {
    return {}
  },

  methods: {
    send() {
      this.$bus.$emit('edit', 'edit')
    }
  }
})
