Vue.component('edit-span', {
  props: ['value','disable'],
  template: `
   <span class='edit-button'>
    <span v-show="!editName">{{value}}</span>
    <input type="text" v-show="editName" @input='listenInput' :value='value'>
    <button v-if='!disable' @click="editName = !editName" >edit</button>
  </span>
  `,
  data() {
    return {
      editName:false
    }
  },
  methods: {
    listenInput(e) {
      this.$emit('edit',e.target.value)
    }
  }
})