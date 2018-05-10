Vue.component('edit-span', {
  props: ['value', 'disable'],
  template: `
   <span >
    <span v-show="!editName">{{value}}</span>
    <el-input type="text" v-show="editName"   @change='listenInput' :value='value'  class='input'>
  </span>
  `,
  data() {
    return {
      editName: false,
      addShow: false
    }
  },
  created() {
    this.$bus.$on('edit', x => {
      this.editName = !this.editName
    })
    this.$bus.$on('add', x => {
     this.editName=true
    })
  },
  methods: {
    listenInput(value) {
      this.$emit('edit', value)
    }
  }
})
