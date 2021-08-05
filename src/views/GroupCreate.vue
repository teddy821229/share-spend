<template>
  <div class="main-content">
    <TopNavBar 
      msg="新增群組"
      :show="true"
    />
    <div class="content-container">
      <CreateGroupForm 
        @after-submit="afterSubmit"
      /> 

      <!-- Group Create Form -->
    </div>
  </div>
</template>

<script>
import TopNavBar from "./../components/TopNavBar.vue"
import CreateGroupForm from './../components/CreateGroupFrom.vue'

export default {
  name: 'GroupCreate',
  components: {
    TopNavBar,
    CreateGroupForm
  },
  methods: {
    afterSubmit([formData, members]) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value);
      }
      console.log('members', members);
      
      this.$router.push({ name: 'group', params: { id: 1 }})
    }
  }
}
</script>

<style scoped>
.main-content {
  position: relative;

  height: 100%;
  width: 100%;
}

.content-container {
  height: calc(100% - 100px);
}

</style>