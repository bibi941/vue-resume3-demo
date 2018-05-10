Vue.component('resume', {
  props: ['mode', 'displayResume', 'resume'],

  template: `
    <div class="resume ">
        <!-- 简历 -->
        <section v-cloak>
          <h1>
            <edit-span :disable='mode==="preview"' :value="displayResume.name" @edit="onEdit('name', $event)" ></edit-span>
          </h1>
          <p class="profile">
            <edit-span :disable='mode==="preview"' :value="displayResume.job" @edit="onEdit('job', $event)"></edit-span>
            <edit-span :disable='mode==="preview"' :value="displayResume.sex" @edit="onEdit('sex', $event)"></edit-span>
            <edit-span :disable='mode==="preview"' :value="displayResume.email" @edit="onEdit('email', $event)"></edit-span>
            <edit-span :disable='mode==="preview"' :value="displayResume.phone" @edit="onEdit('phone', $event)"></edit-span>
          </p>
        </section>
        <!-- 技能 -->
        <section class="skills" v-cloak>
          <h2>技能</h2>
          <ul>
            <li v-for="skill,index in displayResume.skills">
            <div class='name'>
              <edit-span :disable='mode==="preview"' class="name" :value="skill.name" @edit="onEdit('skills['+index+'].name', $event)"></edit-span>
            </div>
            <div class="description">
              <edit-span :disable='mode==="preview"' :value="skill.description" @edit="onEdit('skills['+index+'].description', $event)"></edit-span>
            </div>
              <i v-if='mode==="edit"' v-if="addProject" @click='removekills(index)' class="el-icon-circle-close-outline remove"></i>
            </li>
            <li v-if='mode==="edit"' class="add-skills" v-show="!addProject" >
              <el-button @click='addSkills' type="primary" size='mini'>添加</el-button>
            </li>
          </ul>
        </section>
        <!-- 项目经历 -->
        <section class="projects" v-cloak>
          <h2>项目经历</h2>
          <ol>
            <li v-for="project,index in displayResume.projects">
              <header>
                <h3 class="name">
                  <edit-span :disable='mode==="preview"' :value='project.name' @edit="onEdit('projects['+index+'].name', $event)"></edit-span>
                </h3>
                <div class="buttom">
                  <span class="link">
                    <edit-span :disable='mode==="preview"' :value='project.link' @edit="onEdit('projects['+index+'].link', $event)"></edit-span>
                  </span>
                  <span class="keywords">
                    <edit-span :disable='mode==="preview"' :value='project.keywords' @edit="onEdit('projects['+index+'].keywords', $event)"></edit-span>
                  </span>
                </div>
              </header>
              <div class="descrip">
                <edit-span :disable='mode==="preview"' :value='project.descrip' @edit="onEdit('projects['+index+'].descrip', $event)"></edit-span>
              </div>
              <i v-if="addProject" @click='removeProjects(index)' class="el-icon-circle-close-outline remove"></i>
            </li>
            <li v-if='mode==="edit"' class="add-projects" v-show="!addProject">
              <el-button @click='addProjects' type="primary" size='medium' >添加</el-button>
            </li>
          </ol>
        </section>
      </div> `,

  data() {
    return {
      addProject: false
    }
  },
  created() {
    this.$bus.$on('edit', x => {
      this.addProject = !this.addProject
    })
  },
  methods: {
    onEdit(key, value) {
      let reg = /\[(\d+)\]/g //取到[number]
      key = key.replace(reg, (match, number) => {
        return '.' + number
      })
      keys = key.split('.') //keys=['skills','0','name']
      let result = this.displayResume
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value
        } else {
          result = result[keys[i]]
          //i=0,1,2 result=this.resume[skills][0][name]
        }
      }
    },
    addSkills() {
      this.displayResume.skills.push({
        name: '请填写技能名称',
        description: '请填写技能描述'
      })
    },
    addProjects() {
      this.displayResume.projects.push({
        name: '名称',
        link: 'www.baidu.com',
        keywords: '关键的1皮',
        descrip: '描述描述123333333333333333333333333333333333333333333333'
      })
    },
    removekills(index) {
      this.displayResume.skills.splice(index, 1)
    },

    removeProjects(index) {
      this.displayResume.projects.splice(index, 1)
    }
  }
})
